const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',       // tu contraseña
  database: 'proyecto',
  port: 3306          // puerto de MySQL
});

module.exports = pool;