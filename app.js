const express = require("express");
const path = require("path"); 
const cors = require("cors");
const session = require("express-session");
const exphbs = require("express-handlebars");
const mysql = require("mysql2");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));


app.use(cors({ origin: "http://localhost:3000" }));

// Motor de vistas
const { engine } = require("express-handlebars");
app.engine("hbs", engine({ extname: ".hbs" }));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));


// Sesiones
app.use(
  session({
    secret: "secreto123",
    resave: false,
    saveUninitialized: true,
  })
);




// Rutas
const loginRouter = require("./routes/login");
const promocionesRouter = require("./routes/promociones");
const apiRouter = require("./routes/api");



app.use("/admin", loginRouter);
app.use("/admin/promociones", promocionesRouter);
app.use("/api", apiRouter);



module.exports = app;
