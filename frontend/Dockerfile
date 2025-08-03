# --- Stage 1: Build frontend using Node ---
FROM node:20-alpine AS build

WORKDIR /app
COPY . .
RUN npm install && npm run build

# --- Stage 2: Serve with Nginx ---
FROM nginx:alpine

# Cài đặt gói cần thiết
RUN apk add --no-cache \
    zip \
    unzip \
    curl \
    tzdata \
    rsync \
    openssh \
    grep \
    coreutils \
    vim \
    sed \
    procps \
    net-tools \
    tree && \
    cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime && \
    echo "Asia/Tokyo" > /etc/timezone

# Copy frontend build
COPY --from=build /app/build /usr/share/nginx/html

# Ghi đè nginx.conf
COPY nginx.conf /etc/nginx/nginx.conf

# Đảm bảo quyền cho nginx user
RUN mkdir -p /tmp/nginx && \
    chown -R nginx:nginx /tmp /var/cache/nginx /var/run /etc/nginx /usr/share/nginx/html

USER nginx

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]