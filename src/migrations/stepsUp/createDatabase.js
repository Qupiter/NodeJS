const { logger } = require('../../helpers/logger');
var con = require('../../helpers/database.init');
const { DB_NAME } = require('../../helpers/configurations');

const createDBQuery = `CREATE DATABASE IF NOT EXISTS ${DB_NAME}`;

const createDatabase = () => {
    return new Promise((resolve, reject) => {
        con.query(createDBQuery, (err, _) => {
            if (err) {
                logger.error(err.message);
                return reject(err);
            }
            logger.info('DB created!');
            resolve();
        });
    });
};

module.exports = createDatabase;
