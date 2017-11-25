const ObjectId = require('mongodb');
const videoModel = require('../video/videoModel');
const battleModel = require('../battle/battleModel');

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
    .then(video => {
      res.status(200).json({
        video: video.toClient()
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
};

const createVideoSubmission = async (req, res) => {
  try {
    const data = {
      currentBattleId: req.params.currentBattleId,
      userId: req.body.userId,
      title: req.body.title,
      videoLink: req.body.videoLink
    };
    const video = await createVideo(data);
    await addVideoToBattle(
      data.currentBattleId,
      video._id.toString(),
      data.userId
    );
    return res.status(201).json(video.toClient());
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error: ' + err.message });
  }
};

const createVideo = async data => {
  try {
    const newVideo = await videoModel.create({
      createdDate: new Date(),
      battleIds: [data.currentBattleId],
      title: data.title,
      videoLink: data.videoLink,
      userId: data.userId,
      voteCountUp: 0,
      voteCountDown: 0,
      comments: []
    });
    return newVideo;
  } catch (err) {
    console.error('err is ->', err);
    throw new Error(err.message);
  }
};

const addVideoToBattle = async (battleId, videoId, userId) => {
  try {
    await battleModel.findByIdAndUpdate(battleId, {
      $push: {
        videoIds: { id: videoId },
        participants: { userId: userId }
      }
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

const updateComments = (req, res) => {
  const videoId = req.params.videoId;
  const comment = req.body.comment;
  const author = req.body.author;
  videoModel
    .findByIdAndUpdate(videoId, {
      $push: {
        comments: { comment, author }
      }
    })
    .then(() => res.status(200).end())
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Internal server error' });
    });
};

const updateVoteCountUpById = (req, res) => {
  const videoId = req.params.videoId;
  videoModel
    .findByIdAndUpdate(videoId, { $inc: { voteCountUp: 1 } })
    .then(() => res.status(200).end())
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
  createVideoSubmission,
  updateComments,
  updateVoteCountUpById,
  updateVoteCountDownById
};
