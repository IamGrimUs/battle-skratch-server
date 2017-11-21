const express = require('express');
const bodyParser = require('body-parser');

const videoController = require('./videoController');
const jsonParser = bodyParser.json();
const router = express.Router();

router.use(jsonParser);
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/', videoController.findAllVideos);
router.get('/:videoId/', videoController.findVideoById);
router.put('/voteCountUp/:videoId', videoController.updateVoteCountUpById);
router.put('/voteCountDown/:videoId', videoController.updateVoteCountDownById);
router.put('/:videoId/:author/:comment/', videoController.updateComments);
// router.get('/submissionVideos', videoController.findVideoById);

module.exports = router;
