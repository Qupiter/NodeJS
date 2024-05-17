const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../helpers/configurations');
const UserModel = require('../models/UserModel.js');

exports.authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if(!token) {
        return res.status(401).json({error: 'Unauthorized'});
    }

    jwt.verify(token, JWT_SECRET_KEY, async (err, user) => {
        if(err) {
            return res.status(403).json({error: 'Invalid token'});
        }

        const identify = await UserModel.identify(user.id);
        if(!identify) {
            return res.status(403).json({error: 'User no longer exists'});
        }

        req.user = user;
        next();
    }); 


}