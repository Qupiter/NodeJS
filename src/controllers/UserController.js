const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const con = require('../config/database.js');
const UserModel = require('../models/UserModel.js');

class UserController {

    //** fetches all users */
    static async list(req, res) {
        con.query("SELECT * FROM users", function (err, result, fields) {
            if (err) throw err;
            res.status(200).json(result);
        });
    }

    //** register a new user */
    static async register(req, res) {
        // validation
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            res.status(400).json({errors: errors.array()});
        }

        const requestParameters = {
            email: req.body.email,
            password: req.body.password
        };

        try {
            const existingUser = await UserModel.getUserByEmail(requestParameters.email);
            if(existingUser) {
                return res.status(400).json({error: 'User already exists'})
            }
        } catch (err) {
            return res.status(500).json({errors: 'Iternal server error'});
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHashed = await bcrypt.hash(requestParameters.password, salt);

        try {
            var newUser = await UserModel.createUser(requestParameters.email, passwordHashed);
        } catch (err) {
            return res.status(500).json({errors: 'Iternal server error'});
        }

        return res.status(200).json({
            status: 'success',
            data: newUser
        });
    }
}

module.exports = UserController;