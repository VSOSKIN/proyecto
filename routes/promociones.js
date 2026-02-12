var express = require('express');
var router = express.Router();
var novedadesModel = require('../models/promocionesModel');

router.get('/', async function (req, res, next) {

  var promociones = await promocionesModel.getPromociones();

  res.render('admin/promociones', {
    layout: 'admin/layout',
    usuario: req.session.nombre,
    promociones
  });

});

module.exports = router;
