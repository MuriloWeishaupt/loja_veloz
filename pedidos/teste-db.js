const { Pool } = require('pg');

const pool = new Pool({
  host: "db",
  user: "postgres",
  password: "postgres",
  database: "pedidos",
  port: 5432
});

pool.query('SELECT * FROM pedidos', (err, res) => {
  if(err) console.error('Erro DB:', err);
  else console.log(res.rows);
  pool.end();
});