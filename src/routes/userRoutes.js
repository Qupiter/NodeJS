
const Router = require('express-group-router');

let router = new Router();
const validator = require('../validators/userValidator');
const UserController = require('../controllers/UserController');
const { authenticateToken, authenticateTokenAdmin } = require('../middleware/authMiddleware');
const { asyncHandler } = require('../middleware/asyncHandler');

const wrapAsync = (handlers) => handlers.map(handler => asyncHandler(handler));

router.group('/users', [], (router) => {
    router.get('/list', authenticateToken, UserController.list);
    router.post('/register', validator.registerValidator, UserController.register);
    router.post('/login', validator.loginValidator, UserController.login);
    router.post('/update', authenticateToken, UserController.update);
    router.post('/delete', authenticateToken, UserController.delete);
    router.post('/delete/hard', authenticateTokenAdmin, UserController.deleteHard);
})

module.exports = router;