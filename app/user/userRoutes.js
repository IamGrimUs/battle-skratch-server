const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const { jwtStrategy } = require('../auth/authStrategies');

const userController = require('./userController');
const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

// passport.authenticate('jwt', { session: false }),

router.get('/', userController.findAllUsers);

router.get('/champions', userController.findAllChampions);

router.get('/:userId', userController.findUserById);

module.exports = router;
