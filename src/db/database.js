const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const path = require("path");
require("dotenv").config();
console.log("DATABASE_FILE =", process.env.DATABASE_FILE);
// Database file path
const databasePath = path.join(__dirname, "../../", process.env.DATABASE_FILE);

// Create SQLite connection
const db = new sqlite3.Database(databasePath, (err) => {
    if (err) {
        console.error("Database connection failed:", err.message);
    } else {
        console.log("SQLite database connected.");
    }
});

// Read schema.sql
const schema = fs.readFileSync(
    path.join(__dirname, "schema.sql"),
    "utf8"
);

// Execute schema
db.exec(schema, (err) => {
    if (err) {
        console.error("Schema creation failed:", err.message);
    } else {
        console.log("Database tables created.");
    }
});

module.exports = db;