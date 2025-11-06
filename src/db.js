const sqlite3 = require('sqlite3').verbose();  // <-- THIS IS MISSING
const db = new sqlite3.Database('flags.db');

// Create tables if they don't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS global_flags (
      feature TEXT PRIMARY KEY,
      enabled INTEGER
    )
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS user_flags (
      feature TEXT,
      userId TEXT,
      enabled INTEGER,
      PRIMARY KEY(feature, userId)
    )
  `);
});

module.exports = db;