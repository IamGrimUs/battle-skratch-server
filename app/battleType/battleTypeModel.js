const mongoose = require('mongoose');

const battleTypesSchema = mongoose.Schema({
  description: { type: String },
  duration: { type: Number }
});

battleTypesSchema.methods.toClient = function() {
  return {
    id: this._id,
    description: this.description,
    duration: this.duration
  };
};

const battleType = mongoose.model('battleType', battleTypesSchema);
module.export = battleType;
