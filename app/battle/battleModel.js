const mongoose = require('mongoose');
const moment = require('moment');

const battleSchema = mongoose.Schema({
  startDate: { type: Date },
  endDate: { type: Date },
  beatId: { type: String },
  videoIds: Array,
  participants: Array,
  champion: { userId: String },
  battleTypeId: { type: String }
});

battleSchema.methods.toClient = function() {
  return {
    id: this._id,
    startDate: this.startDate,
    endDate: this.endDate,
    beatId: this.beatId,
    videoIds: this.videoIds,
    participants: this.participants,
    champion: this.champion,
    battleTypeId: this.battleTypeId
  };
};

const battle = mongoose.model('battle', battleSchema);
module.exports = battle;
