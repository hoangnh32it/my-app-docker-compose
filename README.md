# 🧱 Thông Tin Hệ Thống Dự Án

## 📦 Tổng Quan

Dự án bao gồm hệ thống fullstack triển khai bằng Docker Compose với các thành phần:

- **Frontend**: React 19 phục vụ qua Nginx
- **Backend**: Java 17 + Spring Boot
- **Database**: PostgreSQL 14
- Các container được liên kết nội bộ qua `service name` trong cùng mạng Docker

---

## 🖼️ Frontend

| Thành phần     | Thông tin                             |
| -------------- | ------------------------------------- |
| Ngôn ngữ       | JavaScript / TypeScript (tùy chọn)    |
| Framework      | **React** v19                         |
| Web Server     | **nginx** (chạy trong container)      |
| Build frontend | Dùng `npm run build`, tạo file tĩnh   |
| Cách deploy FE | Copy thư mục `build/` vào nginx image |

---

## 🖥️ Backend

| Thành phần        | Thông tin                                                   |
| ----------------- | ----------------------------------------------------------- |
| Ngôn ngữ          | **Java** 17                                                 |
| Framework         | **Spring Boot** (ví dụ: v3.5.4)                             |
| Server Runtime    | **OpenJDK** 17                                              |
| Các API chính     | `/api/products`, `/api/calculator`                          |
| Monitoring        | Spring Boot Actuator (`/actuator/health`, `/actuator/info`) |
| API Documentation | Swagger UI: `/swagger-ui.html`                              |

---

## 🗄️ Database

| Thành phần    | Thông tin      |
| ------------- | -------------- |
| Loại CSDL     | **PostgreSQL** |
| Phiên bản     | 14             |
| Database Name | `productsdb`   |
| Username      | `postgres`     |
| Password      | `postgres`     |
| Port (host)   | 5433           |

---

## ⚙️ Hạ tầng Container & Kết nối

| Thành phần      | Thông tin                                          |
| --------------- | -------------------------------------------------- |
| Orchestration   | **Docker Compose**                                 |
| Kết nối dịch vụ | Sử dụng **service name** (backend → `db`, fe → be) |
| Container FE    | `frontend` (nginx phục vụ React build)             |
| Container BE    | `backend` (Spring Boot app)                        |
| Container DB    | `db` (PostgreSQL 14)                               |
| Kết nối BE → DB | `jdbc:postgresql://db:5432/productsdb`             |

---

## 🔄 Quy trình khởi động

- DB sẽ khởi động đầu tiên
- Backend sẽ khởi động sau khi DB đã healthy
- Frontend sẽ khởi động sau cùng và phục vụ React UI

---

- Kiểm tra version của docker compose

```bash
docker compose version
```

- Build và khởi chạy ngầm các service

```bash
docker compose up --build -d
```

- Hiển thị danh sách tất cả các project Docker Compose đang được quản lý trên hệ thống

```bash
docker compose ls
```

- Kiểm tra tất cả container của docker-compose project đang chạy

```bash
docker compose ps
```

- Kiểm tra danh sách các service đã định nghĩa trong file

```bash
docker compose config --services
```

- Build lại toàn bộ với no-cache sau đó khởi chạy các service

```bash
docker compose build --no-cache
docker compose up -d
```

- Build lại chỉ frontend

```bash
docker compose stop frontend
docker compose build --no-cache frontend
docker compose up -d frontend
```

- Xoá toàn bộ các service

```bash
docker compose down -v
```

- Xem log backend realtime

```bash
docker compose logs -f backend
docker exec -it my-backend-app tail -f /app/logs/application.log
```

## 📝 Ghi chú thêm

- Các container giao tiếp với nhau thông qua bridge network nội bộ
- Dữ liệu mặc định trong DB có thể được khởi tạo qua file ./database/init.sql

## 🔌 API

- `http://localhost:8080/actuator/health`
- `http://localhost:8080/actuator/info`
- `http://localhost:8080/api/products`
- `http://localhost:3000/api/caculator?a=1&b=2`
- `http://localhost:8080/swagger-ui/index.html`

## 💡 Tricks and Tips

- Vào container backend và cài đặt package

```bash
docker exec -it my-backend-app bash
apt-get update && apt-get install -y unzip
unzip -p app.jar
unzip -p app.jar BOOT-INF/classes/application.properties
```

- Dùng jar xf để giải nén .jar

```bash
docker exec -it my-backend-app bash
mkdir tmp && cd tmp
jar xf ../app.jar BOOT-INF/classes/application.properties
cat BOOT-INF/classes/application.properties
```

## ⚛️ Frontend - React

```bash
npx create-react-app frontend
cd frontend
npm install
npm run build
```

## 🗂️ Other

- Remove docker image

```bash
docker rmi my-backend-app my-frontend-app
```

- Cách Spring Boot đọc file cấu hình bên ngoài

```bash
java -jar app.jar --spring.config.location=/path/to/application.properties
```

- Chỉ định tên app khi khởi chạy dự án

```bash
COMPOSE_PROJECT_NAME=myapp docker compose up -d
```
