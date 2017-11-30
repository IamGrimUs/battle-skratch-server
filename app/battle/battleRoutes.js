const express = require('express');
const bodyParser = require('body-parser');

const battleController = require('./battleController');
const router = express.Router();

const passport = require('passport');
const { jwtStrategy } = require('../auth/authStrategies');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  battleController.findAllBattles
);
router.get(
  '/currentBattle',
  passport.authenticate('jwt', { session: false }),
  battleController.findCurrentBattle
);

module.exports = router;
