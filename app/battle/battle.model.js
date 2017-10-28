const mongoose = require('mongoose');

const battleSchema = mongoose.Schema({
  cratedDate: { type: Date },
  startDate: { type: Date },
  endDate: { type: Date },
  videoIds: [{ videoId: String }],
  battleTypeId: { type: String },
  beatUrl: { type: String },
  participants: [{ userId: String }],
  champion: { type: String }
});

battleSchema.methods.toClient = function() {
  return {
    id: this._id,
    createdDate: this.createdDate,
    startDate: this.startDate,
    endDate: this.endDate,
    videoIds: this.videoIds,
    battleTypeId: this.battleTypeId,
    beatUrl: this.beatUrl,
    participants: this.participants,
    champion: this.champion
  };
};

const battle = mongoose.model('battle', battleSchema);
module.exports = battle;
