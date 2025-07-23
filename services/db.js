// services/db.js
const mysql = require('mysql2/promise');
require('dotenv').config();

// Create MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Save chatbot/audio interaction
async function saveInteraction(type, input, output, userId = null) {
  const query = `
    INSERT INTO ai_interactions (type, input, output, user_id)
    VALUES (?, ?, ?, ?)
  `;
  const [result] = await pool.query(query, [type, input, output, userId]);
  return result.insertId;
}



module.exports = {
  saveInteraction,
  pool
};
