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

app.get('/', (req, res) => {
  res.status(200).send('Server is running');
});

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

app.post('/', async (req, res) => {
  const { query } = req.body;

  if (!pool) {
    return;
  }
  pool.get((err, db) => {
    if (err) {
      console.error('Error connection to the database:', err);
      return;
    }

    db.query(query, (err, result) => {
      if (err) {
        console.error('Error execute query:', err);
        db.detach();
        return;
      }

      res.status(200).json(result);
      db.detach();
    });
  });
});

app.listen(port, host, () => {
  console.log(`Server started at http://${host}:${port}`);
});
