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

const findVideoById = (req, res) => {
  const videoId = req.params.videoId;
  videoModel
    .findById(videoId)
    .then(async video => {
      res.json(await video.toClient());
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
};

const updateVoteCountUpById = (req, res) => {
  const videoId = req.params.videoId;
  videoModel
    .findByIdAndUpdate(videoId, { $inc: { voteCountUp: 1 } })
    .then(data => {
      console.log(data.voteCountUp);
      return res.status(204).end();
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Internal server error' });
    });
};

const updateVoteCountDownById = (req, res) => {
  const videoId = req.params.videoId;
  videoModel
    .findByIdAndUpdate(videoId, { $inc: { voteCountDown: -1 } })
    .then(() => res.status(204).end())
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Internal server error' });
    });
};

module.exports = {
  findAllVideos,
  findVideoById,
  updateVoteCountUpById,
  updateVoteCountDownById
};
