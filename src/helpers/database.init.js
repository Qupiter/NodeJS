
const mysql = require('mysql2');
const { logger } = require('./logger');
const { DB_HOST, DB_USER, DB_PASS } = require('./configurations');

const con = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS
});

con.connect(function(err) {
    if (err) {
        logger.error(err.message);
        return;
    }
    logger.info("Connected to the database!");
});

module.exports = con;