import express from 'express';
import cors from 'cors';
import firebird from 'node-firebird';
import 'dotenv/config';

const main = async () => {
  const app = express();

  const port = 3000;
  const host = '127.0.0.1';

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const env = process.env;
  const dbConfig = {
    host: env.dbHost,
    port: env.dbPort,
    database: env.dbURL,
    user: env.dbUser,
    password: env.dbPassword,
    encryption: true,
    WireCrypt: true,
  };

  const pool = firebird.pool(5, dbConfig);
  if (!pool) {
    console.log('Failed to initialize database connection pool');
    return;
  }

  let tables = [];

  const getTables = async () => {
    return new Promise((resolve, reject) => {
      pool.get((err, db) => {
        if (err) {
          console.error('Error connection to the database:', err);
          reject(`Error connection to the database: ${err}`);
          return;
        }

        const query =
          'SELECT RDB$RELATION_NAME AS TABLE_NAME FROM RDB$RELATIONS WHERE RDB$SYSTEM_FLAG = 0';

        db.query(query, (err, result) => {
          if (err) {
            console.error('Error execute query:', err);
            reject(`Error execute query: ${err}`);
            db.detach();
            return;
          }

          const resultTables = result.map((item) => item.TABLE_NAME.trim());
          resolve(resultTables);
          db.detach();
        });
      });
    });
  };

  try {
    tables = await getTables();
  } catch (err) {
    console.error('Error get tables:', err);
    return;
  }

  const getTableColumns = async (table) => {
    return new Promise((resolve, reject) => {
      pool.get((err, db) => {
        if (err) {
          console.error('Error connection to the database:', err);
          reject(`Error connection to the database: ${err}`);
          return;
        }

        const query = `SELECT RDB$FIELD_NAME FROM RDB$RELATION_FIELDS WHERE RDB$RELATION_NAME = '${table}'`;

        db.query(query, (err, result) => {
          if (err) {
            console.error('Error execute query:', err);
            reject(`Error execute query: ${err}`);
            db.detach();
            return;
          }

          const resultColumns = result.map((item) =>
            item.RDB$FIELD_NAME.trim()
          );
          resolve(resultColumns);
          db.detach();
        });
      });
    });
  };

  tables.forEach(async (table) => {
    const endpoint = `/${table.toLowerCase()}`;
    let allowedColumns = [];

    try {
      allowedColumns = await getTableColumns(table);
    } catch (err) {
      console.error('Error get table columns:', err);
      return;
    }

    app.get(endpoint, async (req, res) => {
      const query = `SELECT * FROM ${table}`;

      pool.get((err, db) => {
        if (err) {
          console.error('Error connection to the database:', err);
          res.status(500).json({
            error: `Error connection to the database: ${err.message}`,
          });
          return;
        }

        db.query(query, (err, result) => {
          if (err) {
            console.error('Error execute query:', err);
            res
              .status(500)
              .json({ error: `Error execute query: ${err.message}` });
            db.detach();
            return;
          }

          res.status(200).json(result);
          db.detach();
        });
      });
    });

    app.get(`${endpoint}/:id`, async (req, res) => {
      const query = `SELECT * FROM ${table} WHERE ID = ?`;
      const params = req.params.id;

      pool.get((err, db) => {
        if (err) {
          console.error('Error connection to the database:', err);
          res.status(500).json({
            error: `Error connection to the database: ${err.message}`,
          });
          return;
        }

        db.query(query, params, (err, result) => {
          if (err) {
            console.error('Error execute query:', err);
            res
              .status(500)
              .json({ error: `Error execute query: ${err.message}` });
            db.detach();
            return;
          }

          if (result.length === 0) {
            res.status(404).json({ message: 'Item not found' });
          } else {
            res.status(200).json(result[0]);
          }

          db.detach();
        });
      });
    });

    app.post(endpoint, async (req, res) => {
      const keys = Object.keys(req.body);

      const invalidColumn = keys.find((item) => !allowedColumns.includes(item));
      if (invalidColumn) {
        console.error('Invalid column name:', invalidColumn);
        res.status(400).json({
          error: `Invalid column name: ${invalidColumn}`,
        });
        return;
      }

      const queryColumns = keys.map((item) => `"${item}"`).join(', ');
      const queryValues = keys.map(() => '?').join(', ');
      const query = `INSERT INTO ${table} (${queryColumns}) VALUES (${queryValues})`;
      const params = Object.values(req.body);

      pool.get((err, db) => {
        if (err) {
          console.error('Error connection to the database:', err);
          res.status(500).json({
            error: `Error connection to the database: ${err.message}`,
          });
          return;
        }

        db.query(query, params, (err) => {
          if (err) {
            console.error('Error execute query:', err);
            res
              .status(500)
              .json({ error: `Error execute query: ${err.message}` });
            db.detach();
            return;
          }

          res.status(200).json({ message: 'Item created successfully' });
          db.detach();
        });
      });
    });

    app.delete(`${endpoint}/:id`, async (req, res) => {
      const query = `DELETE FROM ${table} WHERE ID = ? RETURNING ID`;
      const params = req.params.id;

      pool.get((err, db) => {
        if (err) {
          console.error('Error connection to the database:', err);
          res.status(500).json({
            error: `Error connection to the database: ${err.message}`,
          });
          return;
        }

        db.query(query, params, (err, result) => {
          if (err) {
            console.error('Error execute query:', err);
            res
              .status(500)
              .json({ error: `Error execute query: ${err.message}` });
            db.detach();
            return;
          }

          if (result.ID) {
            res.status(200).json({ message: 'Item deleted successfully' });
          } else {
            res.status(404).json({ message: 'Item not found' });
          }

          db.detach();
        });
      });
    });

    app.put(`${endpoint}/:id`, async (req, res) => {
      const keys = Object.keys(req.body);

      const invalidColumn = keys.find((item) => !allowedColumns.includes(item));
      if (invalidColumn) {
        console.error('Invalid column name:', invalidColumn);
        res.status(400).json({
          error: `Invalid column name: ${invalidColumn}`,
        });
        return;
      }

      const queryColumnsAndValues = keys
        .map((item) => `"${item}" = ?`)
        .join(', ');
      const query = `UPDATE ${table} SET ${queryColumnsAndValues} WHERE ID = ? RETURNING ID`;
      const params = Object.values(req.body).concat(req.params.id);

      pool.get((err, db) => {
        if (err) {
          console.error('Error connection to the database:', err);
          res.status(500).json({
            error: `Error connection to the database: ${err.message}`,
          });
          return;
        }

        db.query(query, params, (err, result) => {
          if (err) {
            console.error('Error execute query:', err);
            res
              .status(500)
              .json({ error: `Error execute query: ${err.message}` });
            db.detach();
            return;
          }

          if (result.ID) {
            res.status(200).json({ message: 'Item updated successfully' });
          } else {
            res.status(404).json({ message: 'Item not found' });
          }

          db.detach();
        });
      });
    });
  });

  app.listen(port, host, () => {
    console.log(`Server started at http://${host}:${port}`);
  });
};

main();
