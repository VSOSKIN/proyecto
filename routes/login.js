const express = require('express');
const router = express.Router();
const db = require('../db');

// GET login
router.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

// POST login
router.post('/login', async (req, res) => {
  const { usuario, password } = req.body;

  try {
    const [rows] = await db.query(
      'SELECT * FROM usuarios WHERE usuario = ? AND password = ?',
      [usuario, password]
    );

    if (rows.length > 0) {
      // Usuario correcto → guardar sesión
      req.session.user = rows[0];
      // Redirigir a promociones
      res.redirect('/admin/promociones');
    } else {
      // Usuario incorrecto
      res.render('login', { title: 'Login', error: 'Usuario o password incorrectos' });
    }
  } catch (err) {
    console.error(err);
    res.send('Error al consultar la base de datos');
  }
});

module.exports = router;
