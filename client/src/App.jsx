import { useEffect, useState } from "react";
import "./App.css";

const API = "http://localhost:5001/api/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadTasks() {
    try {
      setError("");
      const response = await fetch(API);
      if (!response.ok) throw new Error("Không tải được công việc");
      const data = await response.json();
      setTasks(data);
    } catch {
      setError("Không thể tải công việc. Hãy kiểm tra server.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function addTask(e) {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      setError("");
      const response = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });

      if (!response.ok) throw new Error("Không thêm được công việc");

      const newTask = await response.json();
      setTasks((current) => [newTask, ...current]);
      setTitle("");
    } catch {
      setError("Không thêm được công việc. Hãy kiểm tra server.");
    }
  }

  async function toggleTask(task) {
    try {
      const response = await fetch(`${API}/${task._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !task.completed }),
      });

      if (!response.ok) throw new Error();
      const updated = await response.json();

      setTasks((current) =>
        current.map((item) => item._id === updated._id ? updated : item)
      );
    } catch {
      setError("Không cập nhật được công việc.");
    }
  }

  async function deleteTask(id) {
    try {
      const response = await fetch(`${API}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error();
      setTasks((current) => current.filter((task) => task._id !== id));
    } catch {
      setError("Không xóa được công việc.");
    }
  }

  return (
    <main className="container">
      <h1>My Task Manager</h1>
      <p>Server: MERN server is running!</p>

      <form onSubmit={addTask}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nhập công việc..."
        />
        <button type="submit">Thêm</button>
      </form>

      <h2>Danh sách công việc</h2>

      {error && <p role="alert">{error}</p>}
      {loading ? (
        <p>Đang tải công việc...</p>
      ) : tasks.length === 0 ? (
        <p>Bạn chưa có công việc nào</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task._id}>
              <label>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task)}
                />
                <span
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                  }}
                >
                  {task.title}
                </span>
              </label>
              <button type="button" onClick={() => deleteTask(task._id)}>
                Xóa
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default App;