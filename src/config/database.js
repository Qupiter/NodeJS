
const mysql = require('mysql2');
const { logger } = require('../helpers/logger');
const { DB_HOST, DB_NAME, DB_USER, DB_PASS } = require('../helpers/configurations');

const con = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME
});

con.connect(function(err) {
    if (err) {
        logger.error(err.message);
        return;
    }
    logger.info("Connected to the database!");
});

module.exports = con