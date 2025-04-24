# Bezo
Клон степика и TryHackMe с курсами по информационной безопасности. С использованием backednd-Postgres

## Начало наботы

## Подгрузка зависомостей

```sh
npm install
```

### Начало разработки/доработки проекта (Front)

```sh
cd Bezo
npm run dev
```
### Включение сервера (Back)
На беке использовал supabase для облачного хранения. Для корректной работы надо будет создать файл .env с следующими наполением 
SUPABASE_URL= .....
SUPABASE_KEY= .....
JWT_SECRET= .....

```sh
cd bezo-backend
node --env-file=.env server.js
```
### Если встречаются проблемы с npm следует переустановить пакеты
```sh
rm -rf node_modules package-lock.json && npm install && npm run dev
```
### Будущее развитие
1. Расширить функционал
2. Сделать полную привязку данных к Supabase
3. Сделать адекватную эмуляцию для системных уязвимостей в VirtualBox
