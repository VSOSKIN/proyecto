const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',       // tu host
  user: 'root',            // tu usuario de MySQL
  password: '',            // tu contraseña
  database: 'proyecto',    // 🔹 tu base de datos correcta
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
