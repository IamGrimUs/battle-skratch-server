const express = require('express');
const bodyParser = require('body-parser');

const battleController = require('./battleController');
const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/', battleController.findAllBattles);
router.get('/currentBattle', battleController.findCurrentBattle);

module.exports = router;

// router.post('/:battleId/participant/:userId', () => {
// find the battle by battleId
// push UserId into battle.participants array
// save battle document
//})
