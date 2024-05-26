const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../helpers/configurations');
const { logger } = require('./logger');

const generate = (id, authority) => jwt.sign({ id, authority }, JWT_SECRET_KEY, { expiresIn: '1d'});

const decode = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET_KEY)
    } catch (error) {
        logger.error(error);
    }
};

module.exports = {
    generate,
    decode
}