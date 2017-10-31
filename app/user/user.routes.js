const express = require('express');
const bodyParser = require('body-parser');

const userController = require('./user.controller');
const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/', userController.findAllUsers);
// router.get('/:userId', userController.findUserById);
// router.post('/', userController.createNewUser);
// router.put('/:userId', userController.updateUserById);
// router.delete('/:userId', userController.deleteUserById);

module.exports = router;
