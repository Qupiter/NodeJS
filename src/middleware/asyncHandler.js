const { logger } = require('../helpers/logger');

const asyncHandler = (cb) => async (req, res, next) => {
    try {
        await cb(req, res, next);
    } catch (err) {
        logger.error(err.message);
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
    return true;
};

module.exports = {
    asyncHandler
};
