# Giai đoạn build với Maven
FROM maven:3.9.6-eclipse-temurin-17 AS build

WORKDIR /app

# Copy toàn bộ source code
COPY . .

# Build jar (bỏ qua test)
RUN mvn clean package -DskipTests

# ===============================================

# Giai đoạn runtime
FROM openjdk:17-jdk-slim

# Cài unzip (nếu cần debug config jar)
RUN apt-get update && apt-get install -y unzip vim && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Tạo thư mục log
RUN mkdir -p logs

# Copy file JAR từ stage build
COPY --from=build /app/target/demo-0.0.1-SNAPSHOT.jar app.jar

# Copy file cấu hình từ host vào image
COPY ./src/main/resources/application.properties /app/config/application.properties

EXPOSE 8080

# Chạy JAR và chỉ định file cấu hình bên ngoài
ENTRYPOINT ["java", "-jar", "app.jar", "--spring.config.location=file:/app/config/application.properties"]