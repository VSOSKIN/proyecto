const db = require('./db');

async function getUsuarios() {
    const [rows] = await db.query('SELECT * FROM usuarios');
    return rows;
}
async function getUsuarioById(id) {
    const [rows] = await db.query('SELECT * FROM usuarios WHERE id = ?', [id]);
    return rows[0];
}

async function createUsuario(usuario, password) {
    const [result] = await db.query(
        'INSERT INTO usuarios (usuario, password) VALUES (?, ?)',
        [usuario, password]
    );
    return result.insertId;
}

async function updateUsuario(id, usuario, password) {
    const [result] = await db.query(
        'UPDATE usuarios SET usuario = ?, password = ? WHERE id = ?',
        [usuario, password, id]
    );
    return result.affectedRows;
}

async function deleteUsuario(id) {
    const [result] = await db.query(
        'DELETE FROM usuarios WHERE id = ?',
        [id]
    );
    return result.affectedRows;
}

async function getPromociones() {
    const [rows] = await db.query('SELECT * FROM promociones');
    return rows;
}


async function getPromocionById(id) {
    const [rows] = await db.query('SELECT * FROM promociones WHERE id = ?', [id]);
    return rows[0];
}


async function createPromocion(titulo, subtitulo, cuerpo) {
    const [result] = await db.query(
        'INSERT INTO promociones (titulo, subtitulo, cuerpo) VALUES (?, ?, ?)',
        [titulo, subtitulo, cuerpo]
    );
    return result.insertId;
}

async function updatePromocion(id, titulo, subtitulo, cuerpo) {
    const [result] = await db.query(
        'UPDATE promociones SET titulo = ?, subtitulo = ?, cuerpo = ? WHERE id = ?',
        [titulo, subtitulo, cuerpo, id]
    );
    return result.affectedRows;
}

async function deletePromocion(id) {
    const [result] = await db.query(
        'DELETE FROM promociones WHERE id = ?',
        [id]
    );
    return result.affectedRows;
}

module.exports = {
    getUsuarios,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    deleteUsuario,
    getPromociones,
    getPromocionById,
    createPromocion,
    updatePromocion,
    deletePromocion
};
