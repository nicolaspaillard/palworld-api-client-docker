# syntax=docker/dockerfile:1

ARG NODE_VERSION=25.2.1-alpine
ARG NGINX_VERSION=alpine3.22

# =========================================
# Stage 1: Build the Angular Application
# =========================================

FROM node:${NODE_VERSION} as builder

WORKDIR /app

COPY package.json *package-lock.json* ./

RUN --mount=type=cache,target=/root/.npm npm ci

COPY . .

RUN npm run build 

# =========================================
# Stage 2: Prepare Nginx to Serve Static Files
# =========================================

FROM nginxinc/nginx-unprivileged:${NGINX_VERSION} AS runner

COPY nginx.conf /etc/nginx/nginx.conf

COPY --chown=nginx:nginx --from=builder /app/dist/*/browser /usr/share/nginx/html

USER nginx

EXPOSE 8080

ENTRYPOINT ["nginx", "-c", "/etc/nginx/nginx.conf"]

CMD ["-g", "daemon off;"]