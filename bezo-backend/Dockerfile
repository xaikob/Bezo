FROM node:23-slim

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Если у тебя файл запуска — server.js:
CMD ["node", "server.js"]

EXPOSE 3000
