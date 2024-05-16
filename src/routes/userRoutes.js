
const Router = require('express-group-router');

let router = new Router();
const validator = require('../validators/userValidator');
const UserController = require('../controllers/UserController');

router.group('/users', [], (router) => {
    router.get('/list', UserController.list);
    router.post('/register', validator.registerValidator, UserController.register);
})

module.exports = router;