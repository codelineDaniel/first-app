const { createPool } = require("mysql2/promise");

export const pool = createPool({
  host: "localhost",
  user: "root",
  database: "quiz_app",
  namedPlaceholders: true,
  decimalNumbers: true,
});

