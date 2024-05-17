
const mysql = require('mysql2');

const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

con.connect(function(err) {
    if (err) {
        console.log("Error connecting to the database!");
        return;
    }
    console.log("Connected to the database!");
});

module.exports = con