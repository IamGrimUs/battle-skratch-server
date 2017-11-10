const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  isAdmin: { type: Boolean },
  name: { type: String, required: true },
  img: { type: String },
  battlesEntered: { type: Number },
  battlesWon: { type: Number }
});

userSchema.methods.toClient = function() {
  return {
    id: this._id,
    name: this.name,
    img: this.img,
    battlesEntered: this.battlesEntered,
    battlesWon: this.battlesWon
  };
};

const user = mongoose.model('user', userSchema);

module.exports = user;
