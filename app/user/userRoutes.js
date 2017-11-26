const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const { jwtStrategy } = require('../auth/authStrategies');

const userController = require('./userController');
const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  userController.findAllUsers
);
router.get(
  '/champions',
  passport.authenticate('jwt', { session: false }),
  userController.findAllChampions
);
router.get(
  '/:userId',
  passport.authenticate('jwt', { session: false }),
  userController.findUserById
);

module.exports = router;
