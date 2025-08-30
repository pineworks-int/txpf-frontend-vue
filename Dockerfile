FROM node:20-alpine AS builder

# Installation de pnpm
RUN npm install -g pnpm

WORKDIR /app

# Copie des fichiers de dépendances pnpm
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Installation avec pnpm
RUN pnpm install --frozen-lockfile

# Copie du code source
COPY . .

# Build de l'app
RUN pnpm build

# Production avec Nginx
FROM nginx:alpine

# Copie du build Vue.js
COPY --from=builder /app/dist /usr/share/nginx/html

# Configuration Nginx pour SPA
COPY <<EOF /etc/nginx/conf.d/default.conf
server {
    listen 80;
    server_name localhost;

    location / {
        root /usr/share/nginx/html;
        index index.html index.htm;
        try_files \$uri \$uri/ /index.html;
    }

    # Headers pour les assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
EOF

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]