const express = require('express');
const bodyParser = require('body-parser');

const videoController = require('./videoController');
const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/', videoController.findAllVideos);
router.get('/:videoId', videoController.findVideoById);
// router.get('/submissionVideos', videoController.findVideoById);

module.exports = router;
