const { validationResult } = require('express-validator');
const UserModel = require('../models/UserModel.js');
const { hash: hashPassword, compare: comparePassword } = require('../helpers/password');
const { generate: generateToken } = require('../helpers/token');

class UserController {

    //** fetches all users */
    static async list(req, res) {
        const listUsers = await UserModel.findAll();

        return res.status(200).json({
            status: 'success',
            data: listUsers
        });
    }

    //** register a new user */
    static async register(req, res) {
        // validation
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
           return res.status(400).json({errors: errors.array()});
        }

        const requestParameters = {
            email: req.body.email,
            password: req.body.password
        };

        const existingUser = await UserModel.getUserByEmail(requestParameters.email);
        if(existingUser) {
            return res.status(400).json({error: 'User already exists'})
        }

        const passwordHashed = hashPassword(requestParameters.password);

        var newUser = await UserModel.create(requestParameters.email, passwordHashed);

        return res.status(200).json({
            status: 'success',
            data: newUser
        });
    }

    static async login(req, res) {
        // validation
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            res.status(400).json({errors: errors.array()});
        }

        const requestParameters = {
            email: req.body.email,
            password: req.body.password
        };

        const existingUser = await UserModel.getUserByEmail(requestParameters.email);
        if(existingUser) {
            if (comparePassword(requestParameters.password.trim(), existingUser.password)) {

                const token = generateToken(existingUser.id, existingUser.authority);

                return res.status(200).send({
                    status: 'success',
                    data: {
                        email: existingUser.email,
                        token
                    }
                });
            }
        }

        return res.status(400).json({error: 'Wrong email or password'})
    }

    static async update(req, res) {

        const requestParameters = {
            ids: req.body.ids,
        };

        return res.status(200).json({data: requestParameters.ids})
    }

    static async delete(req, res) {

        const requestParameters = {
            ids: req.body.ids,
        };

        const result = await UserModel.delete(requestParameters.ids);

        return res.status(200).json({data: result})
    }

    static async deleteHard(req, res) {

        const requestParameters = {
            ids: req.body.ids,
        };

        const result = await UserModel.deleteHard(requestParameters.ids);

        return res.status(200).json({data: result})
    }
}

module.exports = UserController;