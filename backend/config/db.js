const mysql = require("mysql2");

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Nandhasql37',
    database: 'lost_found_portal'
})
module.exports = pool;
