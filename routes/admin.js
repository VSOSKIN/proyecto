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



router.get('/promociones/agregar', (req, res) => {
  res.render('admin/agregar_promocion'); // nombre del archivo de vistas
});


// POST guardar promoción
router.post('/promociones/agregar', async (req, res) => {
  const { titulo, subtitulo, cuerpo } = req.body;

  try {
    await db.query(
      'INSERT INTO promociones (titulo, subtitulo, cuerpo) VALUES (?, ?, ?)',
      [titulo, subtitulo, cuerpo]
    );

    res.redirect('/admin/promociones');
  } catch (err) {
    console.error(err);
    res.send('Error al guardar promoción');
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


// POST borrar promoción
router.post('/promociones/borrar/:id', async (req, res) => {
  try {
    const id = req.params.id;

    await db.query('DELETE FROM promociones WHERE id = ?', [id]);

    res.redirect('/admin/promociones');
  } catch (err) {
    console.error(err);
    res.send('Error al borrar la promoción');
  }
});



// GET editar promoción
router.get('/promociones/editar/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const [rows] = await db.query(
      'SELECT * FROM promociones WHERE id = ?',
      [id]
    );

    res.render('admin/editar_promocion', {
      promocion: rows[0]
    });

  } catch (err) {
    console.error(err);
    res.send('Error al cargar promoción');
  }
});


// POST actualizar promoción
router.post('/promociones/editar/:id', async (req, res) => {
  const id = req.params.id;
  const { titulo, subtitulo, cuerpo } = req.body;

  try {
    await db.query(
      'UPDATE promociones SET titulo=?, subtitulo=?, cuerpo=? WHERE id=?',
      [titulo, subtitulo, cuerpo, id]
    );

    res.redirect('/admin/promociones');
  } catch (err) {
    console.error(err);
    res.send('Error al actualizar promoción');
  }
});


module.exports = router;
