import mysql from "mysql2/promise"; // ✅ ES Module import

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "aberami@3126", // your password
  database: "ocp",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool; // ✅ default export
