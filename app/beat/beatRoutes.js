const express = require('express');
const bodyParser = require('body-parser');

const beatController = require('./beatController');
const router = express.Router();

const passport = require('passport');
const { jwtStrategy } = require('../auth/authStrategies');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extends: false }));

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  beatController.findBeat
);

module.exports = router;
