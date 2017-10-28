const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  createdDate: { type: Date },
  isAdmin: { type: Boolean },
  name: { type: String, required: true },
  img: { type: String },
  socialLinks: [{ name: String, url: String }]
});

userSchema.methods.toClient = function() {
  return {
    id: this._id,
    createdDate: this.createdDate,
    name: this.name,
    img: this.img,
    socialLinks: this.socialLinks
  };
};

const user = mongoose.model('user', userSchema);
module.exports = user;
