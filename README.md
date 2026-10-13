# MERN Task Manager

Ứng dụng quản lý công việc được xây dựng bằng MERN Stack và Docker Compose.

## Công nghệ sử dụng

- **MongoDB:** Lưu trữ dữ liệu.
- **Express.js:** Xây dựng API backend.
- **React.js:** Xây dựng giao diện người dùng.
- **Node.js:** Môi trường chạy backend.
- **Docker:** Đóng gói ứng dụng.
- **Docker Compose:** Quản lý và chạy frontend, backend.

## Chức năng

- Hiển thị danh sách công việc.
- Thêm công việc mới.
- Xóa công việc.
- Đánh dấu trạng thái hoàn thành nếu giao diện hỗ trợ.

## Cấu trúc dự án

```text
mern-app/
├── client/
│   ├── Dockerfile
│   └── src/
├── server/
│   ├── Dockerfile
│   ├── .dockerignore
│   └── server.js
├── compose.yaml
├── .gitignore
└── README.md
```

## Cách chạy ứng dụng

### Yêu cầu

- Đã cài đặt Docker Desktop.
- Có kết nối Internet khi tải các image và cài đặt dependencies.
- Đã cấu hình biến môi trường `MONGODB_URI` trong file `server/.env`.

### Khởi chạy

Mở Terminal tại thư mục dự án và chạy:

```bash
docker compose up -d --build
```

### Truy cập

- **Frontend:** http://localhost:4173
- **Backend API:** http://localhost:5001/api/tasks

### Dừng ứng dụng

```bash
docker compose down
```

## Tác giả

GitHub: https://github.com/s236522-prog/mern-app
