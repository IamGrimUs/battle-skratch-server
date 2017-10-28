const userModel = require('./user.model');

const findAllUsers = (req, res) => {
  console.log('find all users is running!');
  userModel
    .find()
    .then(async users => {
      console.log(users);
      let promises = users.map(async user => await user.toClient());
      res.json({
        users: await Promise.all(promises)
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
};

const findUserById = (req, res) => {
  const userId = req.params.userId;
  userModel
    .findById(userId)
    .then(async user => {
      res.json(await user.toClient());
    })
    .catch(err => {
      console.log(err);
      rew.status(500).json({ message: 'Internal server error' });
    });
};

const createNewUser = async (req, res) => {
  userModel
    .create({
      createdDate: req.body.createdDate, //should this be current date rather than form data?
      isAdmin: req.body.isAdmin, // this should defaut to false
      name: req.body.name,
      img: req.body.img, // this gets passed to the db in dropzone?
      socialLinks: req.body.socialLinks
    })
    .then(async userModel => res.status(201).jsong(await userModel.toClient()))
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Internal server error' });
    });
};

const updateUserById = async (req, res) => {
  if (!(req.params.userId && req.body.userId === req.body.userId)) {
    const message =
      `Request path id (${req.params.userID}) and request body id ` +
      `(${req.body.userId}) must match`;
    console.error(message);
    return res.status(400).json({ message: message });
  }
  const toUpdate = {};
  const udateableFields = ['name', 'img', 'socialLinks'];
  updateableFields.forEach(field => {
    if (field in req.body) {
      toUpdate[field] = req.body[field];
    }
  });
  userModel
    .findByIdAndUpdate(req.params.userId, { $set: toUpdate })
    .then(user => {
      console.log(user);
    })
    .then(userModel => res.status(204).end())
    .catch(err => res.status(500).json({ message: 'Internal server error' }));
};

const deleteUserById = (req, res) => {
  userModel
    .findByIdAndRemove({ _id: req.params.userId })
    .then(() => res.status(204).end())
    .catch(err => res.status(500).json({ message: 'Interanl server error' }));
};

module.exports = {
  createNewUser,
  findAllUsers,
  findUserById,
  updateUserById,
  deleteUserById
};
