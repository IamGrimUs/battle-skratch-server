const ObjectId = require('mongodb');

const battleModel = require('./battleModel');
const beatModel = require('../beat/beatModel');
const battleTypeModel = require('../battleType/battleTypeModel');

const findAllBattles = async (req, res) => {
  try {
    const battles = await findBattle();
    const battlesList = battles.map(battle => battle.toClient());

    const battleTypes = [];

    for (let i = 0; i < battlesList.length; i++) {
      const battleType = await findBattleType(battlesList[i].battleTypeId);
      battleTypes.push(battleType.toClient());
    }

    const response = {};
    if (battlesList) response.battlesList = battlesList;
    if (battleTypes) response.battleTypes = battleTypes;

    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error: ' + err.message });
  }
};

const findBattle = async () => {
  const battle = await battleModel.find();
  return battle;
};

const findBattleType = async battleTypeId => {
  const battleType = await battleTypeModel.findById(battleTypeId);
  return battleType;
};

const findBeat = async beatId => {
  const beat = await beatModel.findById(beatId);
  return beat;
};

const findCurrentBattle = async (req, res) => {
  try {
    const currentBattles = await battleModel.find({
      startDate: { $lte: new Date() },
      endDate: { $gte: new Date() }
    });
    // const currentBattles = await battleModel.find();
    console.log(currentBattles);
    console.log(new Date());
    const currentBattle = currentBattles[0].toClient();
    const beat = await findBeat(currentBattle.beatId);
    currentBattle.beatId = beat;
    const battleType = await findBattleType(currentBattle.battleTypeId);
    currentBattle.battleTypeId = battleType;

    const response = {};
    if (currentBattle) response.currentBattle = currentBattle;

    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error: ' + err.message });
  }
};

module.exports = {
  findAllBattles,
  findCurrentBattle
};
