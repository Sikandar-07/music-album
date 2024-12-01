const db = require("mysql2/promise");

const pool = db.createPool({
  database: "MusicAlbumsDB",
  host: "localhost",
  user: "root",
  password: "Sikandar07",
});

module.exports = pool;
