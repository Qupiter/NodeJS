const createDatabase = require('./stepsUp/createDatabase');
const createUserTable = require('./stepsUp/createUserTable');

const runUpMigrations = async () => {
    try {
        //create database if does not exist
        await createDatabase();

        //connect to database
        var con = require('../helpers/database');

        //drop&fill tabels and data
        await createUserTable(con);

        process.exit(0);
    } catch (err) {
        process.exit(1);
    }
};

runUpMigrations();