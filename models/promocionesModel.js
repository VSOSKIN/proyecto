const pool = require('./db');

async function getPromociones() {
  try {
    const query = 'SELECT * FROM promociones ORDER BY id DESC';
    const rows = await pool.query(query);
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = { getPromociones };
