import express from 'express';
import cors from 'cors';
import firebird from 'node-firebird';

const app = express();

const port = 3000;
const host = '127.0.0.1';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).send('Server is running');
});

app.post('/', async (req, res) => {
  const { database, user, password, query } = req.body;

  const dbConfig = {
    host: '127.0.0.1',
    port: 3050,
    database,
    user,
    password,
    encryption: true,
    WireCrypt: true,
  };

  firebird.attach(dbConfig, (err, db) => {
    if (err) {
      console.error('Error connection to the database:', err);
      return;
    }

    console.log('Connection to the database is successfully');

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
