# === Этап сборки ===
FROM node:23-slim AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
# Обязательно: здесь билдим проект
RUN npm run build   
# В результате появится папка /app/dist

# === Этап продакшена ===
FROM nginx:alpine
# Удаляем статику по-умолчанию
RUN rm -rf /usr/share/nginx/html/*

# Копируем только готовую сборку из предыдущего этапа
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
