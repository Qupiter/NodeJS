const dropDatabase = require('./stepsDown/dropDatabase');

const runDownMigrations = async () => {
    try {
        await dropDatabase();
        process.exit(0);
    } catch (err) {
        process.exit(1);
    }
};

runDownMigrations();