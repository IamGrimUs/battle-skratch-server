const express = require('express');
const bodyParser = require('body-parser');

const userController = require('./userController');
const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/', userController.findAllUsers);
router.get('/champions', userController.findAllChampions);
router.get('/:userId', userController.findUserById);

// router.get('/:userId', userController.findUserById);
// router.post('/', userController.createNewUser);
// router.put('/:userId', userController.updateUserById);
// router.delete('/:userId', userController.deleteUserById);

module.exports = router;

// router.post('/:battleId/participant/:userId', () => {
// find the battle by battleId
// push UserId into battle.participants array
// save battle document
//})
