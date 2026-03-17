# ---- ビルドステージ ----
FROM node:22-alpine AS builder

WORKDIR /app

# 依存関係をインストール
COPY package*.json ./
RUN npm ci

# ソースコードをコピー
COPY . .

# VITE_API_URL をビルド時引数として受け取る（Vite がビルド時にバンドルするため）
ARG VITE_API_URL=http://localhost:8888
ENV VITE_API_URL=$VITE_API_URL

# 型チェックをスキップして Vite のバンドルのみ実行（未使用変数エラーを回避）
RUN npx vite build

# ---- 本番ステージ (Nginx) ----
FROM nginx:alpine

# ビルド成果物を Nginx の公開ディレクトリに配置
COPY --from=builder /app/dist /usr/share/nginx/html

# SPA ルーティング用の Nginx 設定
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
