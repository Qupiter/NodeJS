const { logger } = require('../../helpers/logger');
var con = require('../../helpers/database.init');
const { DB_NAME } = require('../../helpers/configurations');

const dropDBQuery = `DROP DATABASE IF EXISTS ${DB_NAME}`;

const dropDatabase = () => {
    return new Promise((resolve, reject) => {
        con.query(dropDBQuery, (err, _) => {
            if (err) {
                logger.error(err.message);
                return reject(err);
            }
            logger.info('DB dropped!');
            resolve();
        });
    });
};

module.exports = dropDatabase;