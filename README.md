# MERN Student Management

Ứng dụng quản lý sinh viên được xây dựng bằng MERN Stack, MongoDB Atlas và Docker Compose.

## 1. Công nghệ sử dụng

- **MongoDB Atlas:** Lưu trữ dữ liệu sinh viên trên nền tảng đám mây.
- **Express.js:** Xây dựng API backend.
- **React.js:** Xây dựng giao diện người dùng.
- **Node.js:** Môi trường chạy backend.
- **Docker:** Đóng gói frontend và backend thành các container.
- **Docker Compose:** Quản lý và chạy các dịch vụ của ứng dụng.

## 2. Chức năng

- Hiển thị danh sách sinh viên.
- Thêm sinh viên mới.
- Cập nhật thông tin sinh viên.
- Xóa sinh viên.
- Lưu trữ thông tin sinh viên trong MongoDB Atlas.

Mỗi sinh viên có các thông tin: mã số sinh viên (MSSV), họ và tên, email.

## 3. Cấu trúc dự án

```text
mern-app/
├── client/
│   ├── Dockerfile
│   ├── .dockerignore
│   └── src/
├── server/
│   ├── Dockerfile
│   ├── .dockerignore
│   └── server.js
├── compose.yaml
├── .gitignore
└── README.md
```

## 4. Yêu cầu

- Đã cài đặt Docker Desktop.
- Có kết nối Internet.
- Có tài khoản MongoDB Atlas và chuỗi kết nối hợp lệ.
- Đã tạo file `server/.env` với biến môi trường `MONGODB_URI`.

Ví dụ cấu hình trong `server/.env`:

```env
MONGODB_URI=your_mongodb_connection_string
```

Thay giá trị ví dụ bằng chuỗi kết nối MongoDB Atlas của bạn. Không đăng tải thông tin kết nối bí mật lên GitHub.

## 5. Cách chạy ứng dụng

Mở Terminal tại thư mục gốc `mern-app` và chạy:

```bash
docker compose up -d --build
```

Kiểm tra trạng thái các container:

```bash
docker compose ps
```

Xem log backend:

```bash
docker compose logs backend
```

## 6. Địa chỉ truy cập

- **Frontend:** http://localhost:4173
- **Backend kiểm tra:** http://localhost:5001/
- **API chào mừng:** http://localhost:5001/api/hello
- **API danh sách sinh viên:** http://localhost:5001/api/students

## 7. Dừng ứng dụng

```bash
docker compose down
```

Để chạy lại ứng dụng:

```bash
docker compose up -d
```

## 8. Kiểm thử

- Kiểm tra frontend và backend đều chạy bằng Docker Compose.
- Kiểm tra API danh sách sinh viên.
- Thử thêm, sửa và xóa sinh viên.
- Kiểm tra log backend để xác nhận kết nối MongoDB Atlas.
- Khởi động lại các container và kiểm tra dữ liệu sinh viên vẫn còn trong MongoDB Atlas.

## 9. GitHub

Repository: https://github.com/s236522-prog/mern-app
