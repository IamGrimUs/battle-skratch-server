const ObjectId = require('mongodb');
const beatModel = require('./beatModel');

const findBeat = (req, res) => {
  beatModel
    .find()
    .then(beats => {
      res.status(200).json({
        beats: beats.map(beat => beat.toClient())
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
};

module.exports = {
  findBeat
};
