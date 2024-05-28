const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../helpers/configurations');
const { UserModel } = require('../models/UserModel');

const verifyToken = (req, res, next, requiredRoles = []) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    jwt.verify(token, JWT_SECRET_KEY, async (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }

        const identify = await UserModel.identify(user.id);
        if (!identify) {
            return res.status(403).json({ error: 'User no longer exists' });
        }

        if (requiredRoles.length > 0 && !requiredRoles.includes(user.authority)) {
            return res.status(403).json({ error: 'User has no permissions for this action' });
        }

        req.user = user;
        next();
    });
};

exports.authenticateToken = (req, res, next) => {
    verifyToken(req, res, next);
};

exports.authenticateTokenWithRoles = (requiredRoles) => {
    return (req, res, next) => {
        verifyToken(req, res, next, requiredRoles);
    };
};
