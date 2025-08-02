# --- Stage 1: Build frontend using Node ---
FROM node:20-alpine AS build

WORKDIR /app
COPY . .

# Cài đặt và build frontend
RUN npm install && npm run build

# --- Stage 2: Serve with Nginx ---
FROM nginx:alpine

# Copy build output từ giai đoạn build sang nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copy nginx config nếu cần tùy chỉnh
COPY nginx.conf /etc/nginx/conf.d/default.conf