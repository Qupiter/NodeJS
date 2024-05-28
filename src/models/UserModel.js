var con = require('../helpers/database');

// TODO: maybe Authority should be included into the User class and extracted together in a separate file
const Authority = Object.freeze({
    USER: 0,
    MODERATOR: 1,
    OPERATOR: 2,
    ADMINISTRATOR: 3
  });

class User {
    constructor(email, password, authority = 0, id = null) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.authority = authority;
    }

    getRoleName() {
        switch (this.authority) {
            case Authority.USER:
              return 'User';
            case Authority.MODERATOR:
              return 'Moderator';
            case Authority.OPERATOR:
              return 'Operator';
            case Authority.ADMINISTRATOR:
              return 'Administrator';
            default:
              // TODO: add logger
              throw e;
        }
    }

    getPublicView() {
        const roleName = this.getRoleName(this.authority);
        return {
            id: this.id, 
            email: this.email, 
            authority: roleName
        };
    }
}

class UserModel {

    // Inserts a new user into the database
    static create(email, hash) {
        // create user
        const user = new User(email, hash);

        return new Promise((resolve, reject) => {
            con.query('INSERT INTO users SET ?', user, function(err, result) {
                if (err) reject(err);
                user.id = result.insertId;
                resolve(user);
            });
        });
    }

    // Updates a user in the database
    static update(user) {
        return new Promise((resolve, reject) => {
            const updates = {
                email: user.email,
                password: user.password,
                authority: user.authority
            };
            con.query('UPDATE users SET ? WHERE id = ?', [updates, user.id], function(err, result) {
                if (err) reject(err);
                resolve(result);
            });
        });
    }

    // Soft deletes users by flipping the deleted flag in bulk
    static delete(ids) {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE users SET deleted = true WHERE id IN (?)';
            con.query(query, [ids], function(err, result) {
                if (err) reject(err);
                resolve(result);
            });
        });
    }

    // Reverses soft delete
    static restore(id) {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE users SET deleted = false WHERE id = ?';
            con.query(query, [id], function(err, result) {
                if (err) reject(err);
                resolve(result);
            });
        });
    }

    // Hard deletes users from the database in bulk
    static deleteHard(ids) {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM users WHERE id IN (?)';
            con.query(query, [ids], function(err, result) {
                if (err) reject(err);
                resolve(result);
            });
        });
    }

    // Fetches all active users
    static findByIds(ids) {
        return new Promise((resolve, reject) => {
            con.query('SELECT * FROM users WHERE deleted = 0 AND id IN (?)', [ids], function(err, results) {
                if (err) reject(err);
                const users = results.map(result => UserModel.buildUserFromData(result));
                resolve(users);
            });
        });
    }

    // Fetches an active user by id
    static findOne(id) {
        return new Promise((resolve, reject) => {
            con.query('SELECT * FROM users WHERE deleted = 0 AND id = ?', id, function(err, result) {
                if (err) reject(err);
                if (result && result.length > 0) {
                    const user = UserModel.buildUserFromData(result[0]);
                    resolve(user);
                } else {
                    resolve(null); // No user found
                }
            });
        });
    }

    // Fetches an active user by passed email
    static getUserByEmail(email) {
        return new Promise((resolve, reject) => {
            con.query('SELECT * FROM users WHERE deleted = 0 AND email = BINARY ?', email, function(err, result) {
                if (err) reject(err);
                if (result && result.length > 0) {
                    const user = UserModel.buildUserFromData(result[0]);
                    resolve(user);
                } else {
                    resolve(null); // No user found
                }
            });
        });
    }

    // Identifies User by id
    static identify(id) {
        return new Promise((resolve, reject) => {
            con.query('SELECT * FROM users WHERE deleted = 0 AND id = ? LIMIT 1', id ?? 0, function(err, result) {
                if (err) reject(err);
                if (result && result.length > 0) {
                    resolve(true); // User found
                } else {
                    resolve(false); // No user found
                }
            });
        });
    }

    // Instantiates User from database data
    static buildUserFromData(data) {
        return new User(data.email, data.password, data.authority, data.id);
    }
}

module.exports = {UserModel, Authority};
