## Настройка проекта

```sh
npm install
```

### Запуск сервера

```sh
npm start
```

## Проверка работы API

### Примеры API маршрутов

#### /connect

- Подключение к базе данных: POST http://127.0.0.1:3000/connect

#### /get

- Получение данных: POST http://127.0.0.1:3000/get

#### /create

- Создание записи: POST http://127.0.0.1:3000/create

#### /delete

- Удаление записи: DELETE http://127.0.0.1:3000/delete

#### /update

- Обновление записи: PUT http://127.0.0.1:3000/update

### Пример ожидаемых данных

#### Подключение к базе данных

```bash
{
  database: 'D:\\RedDatabase\\TEST.FDB',
  user: 'SYSDBA',
  password: 'masterkey',
}

```

#### Получение данных

```bash
{
  query: 'SELECT * FROM TABLE_NAME',
  params: []
}

```

#### Создание записи

```bash
{
  query: 'INSERT INTO TABLE_NAME ( NAME, DESCRIPTION) VALUES (?, ?)',
  params: ['value_name','value_description']
}

```

#### Удаление записи

```bash
{
  query: 'DELETE FROM TABLE_NAME WHERE ID = ?',
  params: ['value_id']
}

```

#### Обновление записи

```bash
{
  query: 'UPDATE TABLE_NAME SET NAME = ?, DESCRIPTION = ? WHERE ID = ?',
  params: ['new_value_name','new_value_description','value_id']
}

```
