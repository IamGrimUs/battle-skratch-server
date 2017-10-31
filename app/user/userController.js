const userModel = require('./userModel');

const findAllUsers = (req, res) => {
  console.log('well hello there');
  userModel
    .find()
    .then(users => {
      console.log('hello', users);
      res.status(200).json({
        users: users.map(user => user.toClient())
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
};

// const findUserById = (req, res) => {
//   const userId = req.params.userId;
//   userModel
//     .findById(userId)
//     .then(async user => {
//       res.json(await user.toClient());
//     })
//     .catch(err => {
//       console.log(err);
//       rew.status(500).json({ message: 'Internal server error' });
//     });
// };

// const createNewUser = async (req, res) => {
//   userModel
//     .create({
//       createdDate: req.body.createdDate, //should this be current date rather than form data?
//       isAdmin: req.body.isAdmin, // this should defaut to false
//       name: req.body.name,
//       img: req.body.img, // this gets passed to the db in dropzone?
//       socialLinks: req.body.socialLinks
//     })
//     .then(async userModel => res.status(201).json(await userModel.toClient()))
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({ message: 'Internal server error' });
//     });
// };

// const updateUserById = async (req, res) => {
//   if (!(req.params.userId && req.body.userId === req.body.userId)) {
//     const message =
//       `Request path id (${req.params.userID}) and request body id ` +
//       `(${req.body.userId}) must match`;
//     console.error(message);
//     return res.status(400).json({ message: message });
//   }
//   const toUpdate = {};
//   const updateableFields = ['name', 'img', 'socialLinks'];
//   updateableFields.forEach(field => {
//     if (field in req.body) {
//       toUpdate[field] = req.body[field];
//     }
//   });
//   userModel
//     .findByIdAndUpdate(req.params.userId, { $set: toUpdate })
//     .then(user => {
//       console.log(user);
//     })
//     .then(userModel => res.status(204).end())
//     .catch(err => res.status(500).json({ message: 'Internal server error' }));
// };

// const deleteUserById = (req, res) => {
//   userModel
//     .findByIdAndRemove({ _id: req.params.userId })
//     .then(() => res.status(204).end())
//     .catch(err => res.status(500).json({ message: 'Interanl server error' }));
// };

module.exports = {
  findAllUsers
};
