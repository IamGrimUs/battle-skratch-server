const express = require('express');
const bodyParser = require('body-parser');

const passport = require('passport');
const { jwtStrategy } = require('../auth/authStrategies');

const videoController = require('./videoController');
const jsonParser = bodyParser.json();
const router = express.Router();

router.use(jsonParser);
router.use(bodyParser.urlencoded({ extended: false }));

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  videoController.findAllVideos
);
router.get(
  '/:videoId/',
  passport.authenticate('jwt', { session: false }),
  videoController.findVideoById
);
router.put(
  '/voteCountUp/:videoId',
  passport.authenticate('jwt', { session: false }),
  videoController.updateVoteCountUpById
);
router.put(
  '/voteCountDown/:videoId',
  passport.authenticate('jwt', { session: false }),
  videoController.updateVoteCountDownById
);
router.put(
  '/:videoId/',
  passport.authenticate('jwt', { session: false }),
  videoController.updateComments
);
router.post(
  '/:currentBattleId',
  passport.authenticate('jwt', { session: false }),
  videoController.createVideoSubmission
);

module.exports = router;
