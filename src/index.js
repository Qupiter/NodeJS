const app = require('./app');

const { logger } = require('./helpers/logger');

// start up
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    logger.info(`Running on PORT ${PORT}`);
});