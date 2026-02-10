const express = require('express');
const path = require('path');
const session = require('express-session');
const loginRouter = require('./routes/login');
const adminRouter = require('./routes/admin');

const app = express();


app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
  secret: 'mi_clave_secreta',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 1000 }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Rutas
app.use('/admin', loginRouter); // login
app.use('/admin', adminRouter); // promociones

// raíz redirige al login
app.get('/', (req, res) => res.redirect('/admin/login'));

module.exports = app;
