var con = require('../config/database');

class User {
    constructor(email, password, id = null) {
        this.id = id;
        this.email = email;
        this.password = password;
    }
}

const UserModel = {

    // Inserts a new user into the database
    createUser: (email, hash) => {
        // create user
        const user = new User(email, hash);

        return new Promise((resolve, reject) => {            
            con.query('INSERT INTO users SET ?', user, function(err, result) {
                if (err) reject(err);
                user.id = result.insertId;
                resolve(user);
            });
        });
    },

    // Fetches user by passed email
    getUserByEmail: (email) => {
        return new Promise((resolve, reject) => {
            con.query('SELECT * FROM users WHERE email = ?', email, function(err, result) {
                if (err) reject(err);
                if (result && result.length > 0) {
                    const user = UserModel.buildUserFromData(result[0]);
                    resolve(user);
                } else {
                    resolve(null); // No user found
                }
            });
        });
    },

    // Identifies User by id
    identify: (id) => {
        return new Promise((resolve, reject) => {            
            con.query('SELECT * FROM users WHERE id = ? LIMIT 1', id ?? 0, function(err, result) {
                if (err) reject(err);
                if (result && result.length > 0) {
                    resolve(true); // User found
                } else {
                    resolve(false); // No user found
                }
            });
        });
    },

    // Instanciates User from database data
    buildUserFromData: (data) => {
        return new User(data.email, data.password, data.id);
    }
};

module.exports = UserModel;