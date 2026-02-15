const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");

// Conexión a la base de datos
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "proyecto"
};

// GET /api/promociones
router.get("/promociones", async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute("SELECT * FROM promociones");
    res.json(rows);
    await connection.end();
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener promociones" });
  }
});




module.exports = router;
