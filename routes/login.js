const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");

const dbConfig = {
  host: "localhost",
  user: "TU_USUARIO",
  password: "TU_PASSWORD",
  database: "proyecto",
};

router.get("/login", (req, res) => {
  res.render("login", { title: "Login" });
});

router.post("/login", async (req, res) => {
  const { usuario, password } = req.body;
  const connection = await mysql.createConnection(dbConfig);
  const [rows] = await connection.execute(
    "SELECT * FROM usuarios WHERE usuario=? AND password=?",
    [usuario, password]
  );
  await connection.end();

  if (rows.length > 0) {
    req.session.user = rows[0];
    res.redirect("/admin/promociones");
  } else {
    res.render("login", { error: "Usuario o contraseña incorrecta" });
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/admin/login");
});

module.exports = router;
