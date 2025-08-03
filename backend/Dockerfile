# --- Giai đoạn build với Maven ---
FROM maven:3.9.6-eclipse-temurin-17 AS build

WORKDIR /app

COPY . .

RUN mvn clean package -DskipTests

# --- Giai đoạn runtime ---
FROM openjdk:17-jdk-slim

# Cài đặt các package cần thiết
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        zip \
        unzip \
        curl \
        tzdata \
        rsync \
        openssh-client \
        grep \
        coreutils \
        vim \
        sed \
        procps \
        net-tools \
        tree && \
    rm -rf /var/lib/apt/lists/*

# Thiết lập múi giờ Nhật Bản
ENV TZ=Asia/Tokyo
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Tạo user không phải root
RUN useradd -m appuser

# Làm việc tại /app
WORKDIR /app

# Copy JAR và file config
COPY --from=build /app/target/demo-0.0.1-SNAPSHOT.jar app.jar
COPY ./src/main/resources/application.properties /app/config/application.properties

# Tạo thư mục logs và phân quyền cho toàn bộ thư mục
RUN mkdir -p /app/logs && chown -R appuser:appuser /app

# Chạy với user không phải root
USER appuser

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar", "--spring.config.location=file:/app/config/application.properties"]