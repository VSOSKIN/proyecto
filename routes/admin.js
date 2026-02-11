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



router.get('/novedades/agregar', (req, res) => {
  res.render('admin/agregar_novedad'); // nombre del archivo de vistas
});
router.post('/novedades/guardar', async (req, res) => {
  const { titulo, subtitulo, cuerpo } = req.body;
  try {
    await db.query(
      'INSERT INTO promociones (titulo, subtitulo, cuerpo) VALUES (?, ?, ?)',
      [titulo, subtitulo, cuerpo]
    );
    res.redirect('/admin/promociones');
  } catch (err) {
    console.error(err);
    res.send('Error al guardar la promoción');
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
