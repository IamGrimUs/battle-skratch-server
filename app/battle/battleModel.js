const mongoose = require('mongoose');

const battleSchema = mongoose.Schema({
  startDate: { type: Date },
  endDate: { type: Date },
  beatId: { type: String },
  videoIds: [{ videoId: String }],
  participants: [{ userId: String }],
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
