```jsx
import { useEffect, useState } from "react";
import "./App.css";

const API = "http://localhost:5001/api/students";

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ mssv: "", name: "", email: "" });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function loadStudents() {
    try {
      setError("");
      const response = await fetch(API);
      if (!response.ok) throw new Error();
      setStudents(await response.json());
    } catch {
      setError("Khong tai duoc danh sach sinh vien. Hay kiem tra server.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStudents();
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function resetForm() {
    setForm({ mssv: "", name: "", email: "" });
    setEditingId(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setMessage("");

    const url = editingId ? `${API}/${editingId}` : API;

    try {
      const response = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Khong luu duoc sinh vien");
      }

      if (editingId) {
        setStudents((current) =>
          current.map((student) =>
            student._id === editingId ? data : student
          )
        );
        setMessage("Cap nhat sinh vien thanh cong!");
      } else {
        setStudents((current) => [data, ...current]);
        setMessage("Them sinh vien thanh cong!");
      }

      resetForm();
    } catch (err) {
      setError(err.message || "Khong ket noi duoc server.");
    }
  }

  function editStudent(student) {
    setEditingId(student._id);
    setForm({
      mssv: student.mssv,
      name: student.name,
      email: student.email,
    });
    setError("");
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function deleteStudent(id) {
    if (!window.confirm("Ban co chac muon xoa sinh vien nay?")) return;

    setError("");
    setMessage("");

    try {
      const response = await fetch(`${API}/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Khong xoa duoc sinh vien");
      }

      setStudents((current) =>
        current.filter((student) => student._id !== id)
      );

      if (editingId === id) resetForm();

      setMessage("Xoa sinh vien thanh cong!");
    } catch (err) {
      setError(err.message || "Khong ket noi duoc server.");
    }
  }

  return (
    <main className="container">
      <h1>QUAN LY SINH VIEN - VERSION 2.0</h1>
      <p>Ung dung MERN - MongoDB Atlas - Docker | Phien ban 2.0</p>

      <h2>{editingId ? "Cap nhat sinh vien" : "Them sinh vien"}</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="mssv"
          value={form.mssv}
          onChange={handleChange}
          placeholder="Ma so sinh vien (MSSV)"
          required
        />

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Ho va ten"
          required
        />

        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />

        <button type="submit">
          {editingId ? "Luu thay doi" : "Them sinh vien"}
        </button>

        {editingId && (
          <button type="button" onClick={resetForm}>
            Huy sua
          </button>
        )}
      </form>

      {error && <p role="alert">{error}</p>}
      {message && <p>{message}</p>}

      <h2>Danh sach sinh vien ({students.length})</h2>

      {loading ? (
        <p>Dang tai du lieu...</p>
      ) : students.length === 0 ? (
        <p>Chua co sinh vien nao. Hay them sinh vien dau tien.</p>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>MSSV</th>
                <th>Ho va ten</th>
                <th>Email</th>
                <th>Thao tac</th>
              </tr>
            </thead>

            <tbody>
              {students.map((student) => (
                <tr key={student._id}>
                  <td>{student.mssv}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => editStudent(student)}
                    >
                      Sua
                    </button>{" "}

                    <button
                      type="button"
                      onClick={() => deleteStudent(student._id)}
                    >
                      Xoa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

export default App;
```
