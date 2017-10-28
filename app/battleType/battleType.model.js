const mongoose = require('mongoose');

const battleTypesSchema = mongoose.Schema({
  createdDate: { type: Date },
  name: { type: String },
  duration: { type: Number },
  description: { type: String },
  beatId: { type: String }
});

battleTypesSchema.methods.toClient = function() {
  return {
    id: this._id,
    createdDate: this.createdDate,
    name: this.name,
    duration: this.duration,
    description: this.description,
    beatId: this.beatId
  };
};

const battleType = mongoose.model('battleType', battleTypesSchema);
module.export = battleType;
