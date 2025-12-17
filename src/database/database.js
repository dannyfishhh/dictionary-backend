import mysql from "mysql2/promise";

// Create and specify database connection pool

const pool = mysql.createPool({
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306
})

export default pool;