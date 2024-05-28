
const Router = require('express-group-router');

let router = new Router();
const validator = require('../validators/userValidator');
const UserController = require('../controllers/UserController');
const { authenticateToken, authenticateTokenWithRoles } = require('../middleware/authMiddleware');
const { asyncHandler } = require('../middleware/asyncHandler');
const { Authority } = require('../models/UserModel');

// have to think more about err handling
const wrapAsync = (handlers) => handlers.map(handler => asyncHandler(handler));

router.group('/users', [], (router) => {

    router.post('/list', authenticateToken, UserController.list);
    router.post('/register', validator.registerValidator, UserController.register);
    router.post('/login', validator.loginValidator, UserController.login);

    router.post('/update', authenticateTokenWithRoles([Authority.MODERATOR, Authority.OPERATOR]), UserController.update);
    router.post('/delete', authenticateTokenWithRoles([Authority.OPERATOR]), UserController.delete);

    router.post('/promote', authenticateTokenWithRoles([Authority.ADMINISTRATOR]), UserController.promote);
    router.post('/demote', authenticateTokenWithRoles([Authority.ADMINISTRATOR]), UserController.demote);
    router.post('/delete/hard', authenticateTokenWithRoles([Authority.ADMINISTRATOR]), UserController.deleteHard);
})

module.exports = router;