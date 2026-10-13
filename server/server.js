
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Model công việc
const Task = mongoose.model(
  "Task",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  })
);

// Kiểm tra server
app.get("/", (req, res) => {
  res.json({ message: "MERN server is running!" });
});

// Lấy danh sách công việc
app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ _id: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Không lấy được công việc" });
  }
});

// Thêm công việc
app.post("/api/tasks", async (req, res) => {
  try {
    const title = req.body.title?.trim();

    if (!title) {
      return res.status(400).json({
        message: "Tên công việc không được để trống",
      });
    }

    const task = await Task.create({ title });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Không thêm được công việc" });
  }
});

// Đánh dấu hoàn thành
app.patch("/api/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { completed: req.body.completed },
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Không tìm thấy công việc" });
    }

    res.json(task);
  } catch (error) {
    res.status(400).json({ message: "ID công việc không hợp lệ" });
  }
});

// Xóa công việc
app.delete("/api/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Không tìm thấy công việc" });
    }

    res.json({ message: "Đã xóa công việc" });
  } catch (error) {
    res.status(400).json({ message: "Không xóa được công việc" });
  }
});

// Kết nối database trước khi mở server
const PORT = 5000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully!");

    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });
