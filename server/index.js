import express from 'express';
import cors from 'cors';
import firebird from 'node-firebird';

const app = express();

const port = 3000;
const host = '127.0.0.1';

let pool;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/connect', async (req, res) => {
  const { database, user, password } = req.body;

  const dbConfig = {
    host: '127.0.0.1',
    port: 3050,
    database,
    user,
    password,
    encryption: true,
    WireCrypt: true,
  };

  pool = firebird.pool(5, dbConfig);
  res
    .status(200)
    .json({ message: 'Connection to the database is successfully' });
});

app.post('/get', async (req, res) => {
  if (!pool) {
    res.status(500).json({ error: 'No connection to the database' });
    return;
  }

  const { query, params } = req.body;

  if (query.split(' ')[0].toUpperCase() !== 'SELECT') {
    res.status(403).json({ error: 'Invalid query' });
    return;
  }

  pool.get((err, db) => {
    if (err) {
      console.error('Error connection to the database:', err);
      res
        .status(500)
        .json({ error: `Error connection to the database: ${err.message}` });
      return;
    }

    db.query(query, params, (err, result) => {
      if (err) {
        console.error('Error execute query:', err);
        res.status(500).json({ error: `Error execute query: ${err.message}` });
        db.detach();
        return;
      }

      res.status(200).json(result);
      db.detach();
    });
  });
});

app.post('/create', async (req, res) => {
  if (!pool) {
    res.status(500).json({ error: 'No connection to the database' });
    return;
  }

  const { query, params } = req.body;

  if (query.split(' ')[0].toUpperCase() !== 'INSERT') {
    res.status(403).json({ error: 'Invalid query' });
    return;
  }

  pool.get((err, db) => {
    if (err) {
      console.error('Error connection to the database:', err);
      res
        .status(500)
        .json({ error: `Error connection to the database: ${err.message}` });
      return;
    }

    db.query(query, params, (err) => {
      if (err) {
        console.error('Error execute query:', err);
        res.status(500).json({ error: `Error execute query: ${err.message}` });
        db.detach();
        return;
      }

      res.status(200).json({ message: 'Item created successfully' });
      db.detach();
    });
  });
});

app.delete('/delete', async (req, res) => {
  if (!pool) {
    res.status(500).json({ error: 'No connection to the database' });
    return;
  }

  const { query, params } = req.body;

  if (query.split(' ')[0].toUpperCase() !== 'DELETE') {
    res.status(403).json({ error: 'Invalid query' });
    return;
  }

  pool.get((err, db) => {
    if (err) {
      console.error('Error connection to the database:', err);
      res
        .status(500)
        .json({ error: `Error connection to the database: ${err.message}` });
      return;
    }

    db.query(query, params, (err) => {
      if (err) {
        console.error('Error execute query:', err);
        res.status(500).json({ error: `Error execute query: ${err.message}` });
        db.detach();
        return;
      }

      res.status(200).json({ message: 'Item deleted successfully' });

      db.detach();
    });
  });
});

app.put('/update', async (req, res) => {
  if (!pool) {
    res.status(500).json({ error: 'No connection to the database' });
    return;
  }

  const { query, params } = req.body;

  if (query.split(' ')[0].toUpperCase() !== 'UPDATE') {
    res.status(403).json({ error: 'Invalid query' });
    return;
  }

  pool.get((err, db) => {
    if (err) {
      console.error('Error connection to the database:', err);
      res
        .status(500)
        .json({ error: `Error connection to the database: ${err.message}` });
      return;
    }

    db.query(query, params, (err) => {
      if (err) {
        console.error('Error execute query:', err);
        res.status(500).json({ error: `Error execute query: ${err.message}` });
        db.detach();
        return;
      }

      res.status(200).json({ message: 'Item updated successfully' });
      db.detach();
    });
  });
});

app.listen(port, host, () => {
  console.log(`Server started at http://${host}:${port}`);
});
