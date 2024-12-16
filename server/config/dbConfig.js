// const mysql = require("mysql2");

// const db = mysql.createConnection({
//   user: process.env.DB_USER || "root",
//  password: process.env.DB_PASSWORD || "7878",
//  host: process.env.DB_HOST || "127.0.0.1",
//  port: process.env.DB_PORT || 3306,
//  database: process.env.DB_NAME || "db",
// });

// const mysql = require("mysql2");
// const util = require("util");

// const db = mysql.createPool({
//   user: process.env.DB_USER || "root",
//   password: process.env.DB_PASSWORD || "7878",
//   host: process.env.DB_HOST || "127.0.0.1",
//   port: process.env.DB_PORT || 3306,
//   database: process.env.DB_NAME || "db",
// });

// // Promisify the query function
// db.query = util.promisify(db.query);

// module.exports = db;

const mysql = require("mysql2/promise");

const db = mysql.createPool({
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "7878",
  host: process.env.DB_HOST || "127.0.0.1",
  port: process.env.DB_PORT || 3306,
  database: process.env.DB_NAME || "db",
});

module.exports = db;
