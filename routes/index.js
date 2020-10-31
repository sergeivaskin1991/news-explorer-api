const router = require('express').Router();
const users = require('./users');
const articles = require('./articles');
const { auth } = require('../middlewares/auth');
const { createUser, login, logout } = require('../controllers/auth');
const { createUserValid, loginValid } = require('../middlewares/validation');

router.post('/signin', loginValid, login);
router.post('/signup', createUserValid, createUser);

router.use('/users', auth, users);
router.use('/articles', auth, articles);
router.post('/logout', auth, logout);

module.exports = router;
