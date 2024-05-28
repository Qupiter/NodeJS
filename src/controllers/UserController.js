const { validationResult } = require('express-validator');
const { UserModel, Authority } = require('../models/UserModel');
const { hash: hashPassword, compare: comparePassword } = require('../helpers/password');
const { generate: generateToken } = require('../helpers/token');

class UserController {

    //** fetches all users */
    static async list(req, res) {
        const listUsers = await UserModel.findByIds(req.body.ids);

        return res.status(200).json({
            status: 'success',
            data: listUsers.map(user => user.getPublicView())
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
            data: newUser.getPublicView()
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
            id: req.body.id,
            email: req.body.email,
            restore: req.body.restore,
        };

        const existingUser = await UserModel.findOne(requestParameters.id);

        if(existingUser) {
            if(existingUser.email !== requestParameters.email) {
                existingUser.email = requestParameters.email;

                await UserModel.update(existingUser);
            }
        }
        
        if(requestParameters.restore) await UserModel.restore(requestParameters.id);

        return res.status(200).json({status: 'success'})
    }

    static async promote(req, res) {

        const requestParameters = {
            id: req.body.id
        };

        const existingUser = await UserModel.findOne(requestParameters.id);
        
        if(existingUser) {
            // cannot promote to ADMINISTRATOR
            if(existingUser.authority < Authority.OPERATOR) {
                // promote
                existingUser.authority++;
                await UserModel.update(existingUser);
            } else {
                return res.status(400).json({error: 'Cannot promote this account'})
            }
        }

        return res.status(200).json({status: 'success'})
    }

    static async demote(req, res) {

        const requestParameters = {
            id: req.body.id
        };

        const existingUser = await UserModel.findOne(requestParameters.id);
        
        if(existingUser) {
            // cannot demote a simple USER, also ADMINISTRATORS cannot be demoted
            if(existingUser.authority > Authority.USER
                && existingUser.authority < Authority.ADMINISTRATOR
            ) {
                // demote
                existingUser.authority--;
                await UserModel.update(existingUser);
            } else {
                return res.status(400).json({error: 'Cannot demote this account'})
            }
        }

        return res.status(200).json({status: 'success'})
    }

    static async delete(req, res) {

        const requestParameters = {
            ids: req.body.ids,
        };

        await UserModel.delete(requestParameters.ids);

        return res.status(200).send({status: 'success'});
    }

    static async deleteHard(req, res) {

        const requestParameters = {
            ids: req.body.ids,
        };

        await UserModel.deleteHard(requestParameters.ids);

        return res.status(200).send({status: 'success'});
    }
}

module.exports = UserController;