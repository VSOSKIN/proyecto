const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");
const multer = require("multer");
const cloudinary = require("../config/cloudinary");


const dbConfig = {
  host: "localhost",
  user: "TU_USUARIO",
  password: "TU_PASSWORD",
  database: "proyecto",
};

// Multer para manejar archivos en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Middleware para proteger rutas
router.use(async (req, res, next) => {
  if (req.session.user) next();
  else res.redirect("/admin/login");
});

// Mostrar promociones
router.get("/", async (req, res) => {
  const connection = await mysql.createConnection(dbConfig);
  const [promociones] = await connection.execute("SELECT * FROM promociones");
  await connection.end();
  res.render("promociones", { promociones, title: "Promociones" });
});

router.post("/add", upload.single("imagen"), async (req, res) => {
  try {
    let imagenUrl = null;

    if (req.file) {
      // Subimos la imagen usando cloudinary.uploader.upload con buffer
      const result = await cloudinary.uploader.upload_stream(
        { folder: "promociones" },
        (error, result) => {
          if (error) throw error;
          return result;
        }
      );

      // Forma correcta con Promise
      const streamifier = require("streamifier");
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({ folder: "promociones" }, (err, result) => {
          if (err) reject(err);
          else resolve(result);
        });
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });

      imagenUrl = uploadResult.secure_url;
    }

    const { titulo, subtitulo, cuerpo } = req.body;

    const connection = await mysql.createConnection(dbConfig);
    await connection.execute(
      "INSERT INTO promociones (titulo, subtitulo, cuerpo, imagen_id) VALUES (?, ?, ?, ?)",
      [titulo, subtitulo, cuerpo, imagenUrl]
    );
    await connection.end();

    res.redirect("/admin/promociones");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al subir la promoción");
  }
});


module.exports = router;
