const Database = require('better-sqlite3');
const db = new Database("users.db");


db.exec(
    `
    
    CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        login TEXT UNIQUE NOT NULL,
        passwordHash TEXT NOT NULL,
        role TEXT DEFAULT 'user'
    )

    `
);

module.exports = db