const mongoose = require('mongoose');

const videoSchema = mongoose.Schema({
  title: { type: String },
  createdDate: { type: Date, default: new Date() },
  videoLink: { type: String },
  videoImgLink: { type: String },
  userId: { type: String },
  voteCountUp: { type: Number },
  voteCountDown: { type: Number },
  comments: [{ author: String, comment: String, createdDate: Date }]
});

videoSchema.methods.toClient = function() {
  return {
    id: this._id,
    createdDate: this.createdDate,
    title: this.title,
    videoLink: this.videoLink,
    videoImgLink: this.videoImgLink,
    userId: this.userId,
    voteCountUp: this.voteCountUp,
    voteCountDown: this.voteCountDown,
    comments: this.comments
  };
};

const video = mongoose.model('video', videoSchema);

module.exports = video;
