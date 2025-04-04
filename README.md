## Проверка работы API

### Примеры API маршрутов

#### /connect

- Подключение к базе данных: POST http://127.0.0.1:3000/connect

#### /

- Отправка SQL-запроса: POST http://127.0.0.1:3000/connect

### Пример ожидаемых данных

#### Подключение к базе данных

```bash
{
  database: 'D:\\RedDatabase\\TEST.FDB',
  user: 'SYSDBA',
  password: 'masterkey',
}

```

#### Отправка SQL-запроса

```bash
{
  query: 'SELECT * FROM COUNTRIES'
}

```
