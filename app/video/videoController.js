const ObjectId = require('mongodb');
const videoModel = require('../video/videoModel');

const findAllVideos = (req, res) => {
  videoModel
    .find()
    .then(videos => {
      res.status(200).json({
        video: videos.map(video => video.toClient())
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
};

const findComments = async (req, res) => {
  // console.log('find all comments is now running');
  videoModel
    .find()
    .then(videos => {
      res.status(200).json({
        videos: video.map(video => video.toClient())
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
};

module.exports = {
  findAllVideos,
  findComments
};
