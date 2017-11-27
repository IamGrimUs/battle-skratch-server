const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  isAdmin: { type: Boolean },
  name: { type: String, required: true },
  password: { type: String, required: true },
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

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
};

const user = mongoose.model('user', userSchema);

module.exports = user;
