const { logger } = require('../../helpers/logger');

const TABLE_NAME = '`users`';
const COLUMNS = {
    id: '`id`',
    email: '`email`',
    password: '`password`',
    authority: '`authority`',
    deleted: '`deleted`'
};

const dropUserTableQuery = `DROP TABLE IF EXISTS ${TABLE_NAME};`;

const createUserTableQuery = `
    CREATE TABLE ${TABLE_NAME} (
        ${COLUMNS.id} BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
        ${COLUMNS.email} VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb3_general_ci',
        ${COLUMNS.password} VARCHAR(255) NOT NULL COLLATE 'utf8mb3_general_ci',
        ${COLUMNS.authority} TINYINT(3) NOT NULL DEFAULT '0',
        ${COLUMNS.deleted} TINYINT(3) NOT NULL DEFAULT '0',
        PRIMARY KEY (${COLUMNS.id}) USING BTREE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
`;

const insertInitialDataQuery = `
    INSERT INTO ${TABLE_NAME} (${COLUMNS.id}, ${COLUMNS.email}, ${COLUMNS.password}, ${COLUMNS.authority}, ${COLUMNS.deleted}) VALUES
    (1, 'user@gmail.com', '$2a$10$ejOKzDki9tcVaOrvDEBaY.OPBD6evpZkJMSDefhun.HucUZz5sSf2', 0, 0),
    (2, 'operator@gmail.com', '$2a$10$kaarE2zzB5am1D3w280ZGuLYrwPLrooCxYxyWbWGs9bwlg7O8ri9S', 2, 0),
    (3, 'admin@gmail.com', '$2a$10$sKtYH4zOjtZn33Y2jI9t3uoR/YUaC9.dXGHeF5SRpVa7igW7KNNWi', 3, 0);
`;

const createUserTable = (con) => {
    return new Promise((resolve, reject) => {
        con.query(dropUserTableQuery, (err, _) => {
            if (err) {
                logger.error(err.message);
                return reject(err);
            }
            logger.info('Table dropped!');

            con.query(createUserTableQuery, (err, _) => {
                if (err) {
                    logger.error(err.message);
                    return reject(err);
                }
                logger.info('Table created!');
    
                con.query(insertInitialDataQuery, (err, result) => {
                    if (err) {
                        logger.error(err.message);
                        return reject(err);
                    }
                    logger.info('Initial data inserted!');
                    resolve();
                });
            });
        });
    });
};

module.exports = createUserTable;
