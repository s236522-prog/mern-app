
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Model sinh vien
const Student = mongoose.model(
  "Student",
  new mongoose.Schema(
    {
      mssv: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
      name: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
      },
    },
    { timestamps: true }
  )
);

// Kiem tra server
app.get("/", (req, res) => {
  res.json({ message: "MERN student server is running!" });
});
// API hello theo yeu cau bai Buoi 3
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from MERN backend!" });
});

// Lay danh sach sinh vien
app.get("/api/students", async (req, res) => {
  try {
    const students = await Student.find().sort({ _id: -1 });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Khong lay duoc danh sach sinh vien" });
  }
});

// Them sinh vien
app.post("/api/students", async (req, res) => {
  try {
    const { mssv, name, email } = req.body;

    if (!mssv?.trim() || !name?.trim() || !email?.trim()) {
      return res.status(400).json({
        message: "Vui long nhap MSSV, ho ten va email",
      });
    }

    const student = await Student.create({
      mssv: mssv.trim(),
      name: name.trim(),
      email: email.trim(),
    });

    res.status(201).json(student);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "MSSV hoac email da ton tai",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({ message: "Thong tin sinh vien khong hop le" });
    }

    res.status(500).json({ message: "Khong them duoc sinh vien" });
  }
});

// Sua thong tin sinh vien
app.put("/api/students/:id", async (req, res) => {
  try {
    const { mssv, name, email } = req.body;

    if (!mssv?.trim() || !name?.trim() || !email?.trim()) {
      return res.status(400).json({
        message: "Vui long nhap MSSV, ho ten va email",
      });
    }

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      {
        mssv: mssv.trim(),
        name: name.trim(),
        email: email.trim(),
      },
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).json({ message: "Khong tim thay sinh vien" });
    }

    res.json(student);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "MSSV hoac email da ton tai",
      });
    }

    res.status(400).json({ message: "Khong sua duoc sinh vien" });
  }
});

// Xoa sinh vien
app.delete("/api/students/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Khong tim thay sinh vien" });
    }

    res.json({ message: "Da xoa sinh vien" });
  } catch (error) {
    res.status(400).json({ message: "ID sinh vien khong hop le" });
  }
});

// Ket noi MongoDB Atlas
const PORT = 5000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully!");
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });
