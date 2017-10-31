const mongoose = require('mongoose');

const videoSchema = mongoose.Schema({
  createdDate: { type: String },
  title: { type: String },
  description: { type: String },
  youtubeUrl: { type: String },
  userId: { type: String },
  voteCountUp: { type: Number },
  voteCountDown: { type: Number },
  comments: [{ author: String, comment: String, createdDate: Date }]
});

videoSchema.methods.toClient = function() {
  return {
    id: this._id,
    createdDate: new Date(),
    title: this.title,
    description: this.description,
    youtubeUrl: this.youtubeUrl,
    userId: this.userId,
    voteCountUp: this.voteCountUp,
    voteCountDown: this.voteCountDown,
    comments: this.comments
  };
};

const video = mongoose.model('video', videoSchema);

module.exports = video;
