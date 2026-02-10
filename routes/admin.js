const express = require('express');
const router = express.Router();
const db = require('../db');

// Middleware para proteger rutas
router.use((req, res, next) => {
  if (req.session.user) next();
  else res.redirect('/admin/login');
});

// GET promociones
router.get('/promociones', async (req, res) => {
  try {
    const [promociones] = await db.query('SELECT * FROM promociones');
    res.render('promociones', { 
      title: 'Promociones', 
      promociones, 
      user: req.session.user.usuario 
    });
  } catch (err) {
    console.error(err);
    res.send('Error al obtener promociones');
  }
});

// POST cerrar sesión
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error(err);
      res.send('Error al cerrar sesión');
    } else {
      res.redirect('/admin/login'); // 🔹 redirige al login
    }
  });
});

module.exports = router;
