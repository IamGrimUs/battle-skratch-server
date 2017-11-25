const userModel = require('./userModel');
const videoModel = require('../video/videoModel');
const battleModel = require('../battle/battleModel');
const battleTypeModel = require('../battleType/battleTypeModel');

const findAllUsers = (req, res) => {
  userModel
    .find()
    .then(users => {
      res.status(200).json({
        users: users.map(user => user.toClient())
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
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
};

const findAllChampions = async (req, res) => {
  try {
    const grandChampion = await findGrandChampion();
    const currentChampion = await findCurrentChampion();

    const response = {};
    if (grandChampion) response.grandChampion = grandChampion.toClient();
    if (currentChampion) response.currentChampion = currentChampion.toClient();

    response.currentChampion.battleTypeDescription =
      currentChampion.battleTypeDescription;

    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error: ' + err.message });
  }
};

const findGrandChampion = async () => {
  const users = await userModel
    .find()
    .sort({ battlesWon: -1 })
    .limit(1);
  const grandChampion = users[0];
  return grandChampion;
};

const findCurrentChampion = async () => {
  const battles = await battleModel.find({
    startDate: { $lte: new Date() },
    endDate: { $gte: new Date() }
  });
  const battle = battles[0];
  if (!battle) throw new Error('No battle found');

  const videos = await videoModel
    .find({
      $and: [
        {
          createdDate: {
            $gte: battle.startDate
          }
        },
        {
          createdDate: { $lte: battle.endDate }
        }
      ]
    })
    .sort({ voteCountUp: -1 })
    .limit(1);
  const userId = videos[0].userId;
  const currentChampion = await userModel.findById(userId);
  const battleType = await battleTypeModel.findById(battle.battleTypeId);
  currentChampion.battleTypeDescription = battleType.description;
  return currentChampion;
};

module.exports = {
  findAllUsers,
  findAllChampions,
  findUserById
};
