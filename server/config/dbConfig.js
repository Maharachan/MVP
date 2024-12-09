const mysql = require("mysql2");

const db = mysql.createConnection({
  user: process.env.DB_USER || "root",
 password: process.env.DB_PASSWORD || "12345",
 host: process.env.DB_HOST || "127.0.0.1",
 port: process.env.DB_PORT || 3307,
 database: process.env.DB_NAME || "db",
});

