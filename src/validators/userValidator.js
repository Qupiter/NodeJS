const {body} = require('express-validator')

// TODO: refactor validators
exports.registerValidator = [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min: 8}).withMessage('Password should be at least 8 characters long')
]

exports.loginValidator = [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min: 8}).withMessage('Invalid password')
]