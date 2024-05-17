
const Router = require('express-group-router');

let router = new Router();
const validator = require('../validators/userValidator');
const UserController = require('../controllers/UserController');
const { authenticateToken } = require('../middleware/authMiddleware');
const { asyncHandler } = require('../middleware/asyncHandler');

const wrapAsync = (handlers) => handlers.map(handler => asyncHandler(handler));

router.group('/users', [], (router) => {
    router.get('/list', asyncHandler(authenticateToken), asyncHandler(UserController.list));
    router.post('/register', validator.registerValidator, asyncHandler(UserController.register));
    router.post('/login', validator.loginValidator, asyncHandler(UserController.login));
    router.post('/delete', asyncHandler(authenticateToken), asyncHandler(UserController.delete));
})

module.exports = router;