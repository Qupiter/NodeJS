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
    (1, 'dipper@gmail.com', '$2a$10$mxehy/b1WBW.tjXFiu5m6.DY4Pbck9rPaVFS7bQk1dmSF9w7GHdva', 1, 0),
    (2, 'zubber@gmail.com', '$2a$10$OEZ5saGe4ihnn849ayP9sOz00lVXn6ZGUoznH0Vk6v/Jmtqo/GyL6', 2, 0);
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
