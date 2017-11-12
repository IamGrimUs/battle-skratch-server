const express = require('express');
const bodyParser = require('body-parser');

const beatController = require('./beatController');
const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extends: false }));

router.get('/', beatController.findBeat);

module.exports = router;
