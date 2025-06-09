#!/bin/sh

# Djangoのマイグレーションを実行
python backend/manage.py migrate

# Djangoの開発サーバーを起動（本番環境ではgunicorn等を使用することを推奨）
python backend/manage.py runserver 0.0.0.0:8000 &

# Next.jsのサーバーを起動
node server.js 