const { createPool } = require("mysql2/promise");

const pool = createPool({
  host: "localhost",
  user: "root",
  database: "quiz_app",
  namedPlaceholders: true,
  decimalNumbers: true,
});

module.exports = {
  pool,
};
