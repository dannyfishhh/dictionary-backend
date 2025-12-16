import pool from "./database.js";


const testConnection = async () => {
    pool.getConnection().then((conn) => {
        console.log('connected to Railway MySQL database');
        conn.release();
    }).catch((error) => {
        console.error('MySQL database error:', error);
    })
}

export { testConnection };