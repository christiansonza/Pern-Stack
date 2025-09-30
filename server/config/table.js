const pool = require('./conn')

async function database() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(100) NOT NULL,
        middle_name VARCHAR(100),
        last_name VARCHAR(100) NOT NULL,
        contact VARCHAR(20),
        address TEXT
      );
    `);
    console.log(" Table created!")
    pool.end()
  } catch (err) {
    console.error("Error creating table:", err)
    pool.end()
  }
}

database();
