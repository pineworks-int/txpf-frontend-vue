FROM node:20-alpine AS builder

WORKDIR /app

# Copie des fichiers de dépendances
COPY package*.json ./

# Installation avec npm
RUN npm ci

# Copie du code source
COPY . .

# Variable d'environnement avec valeur par défaut pour le local
ARG VITE_AUTH_API_URL=http://localhost:3001
ENV VITE_AUTH_API_URL=$VITE_AUTH_API_URL

# Build de l'app
RUN npm run build

# Production avec Nginx
FROM nginx:alpine

# Copie du build Vue.js
COPY --from=builder /app/dist /usr/share/nginx/html

# Configuration Nginx pour SPA
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
    \
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ { \
        root /usr/share/nginx/html; \
        expires 1y; \
        add_header Cache-Control "public, immutable"; \
    } \
    \
    gzip on; \
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript; \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]