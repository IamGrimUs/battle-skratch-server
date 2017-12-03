const mongoose = require('mongoose');

const videoSchema = mongoose.Schema({
  createdDate: { type: Date, default: new Date() },
  battleIds: Array,
  title: String,
  videoLink: String,
  userId: String,
  voteCountUp: Number,
  voteCountDown: Number,
  comments: Array
});

videoSchema.methods.toClient = function() {
  function parseEmbedId(url) {
    const fragments = url.split('/');
    const embedIndex = fragments.findIndex(fragment => fragment === 'embed');
    const idFragment = fragments[embedIndex + 1];
    const videoId = idFragment.split(/[?|"]/)[0];
    return `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`;
  }

  return {
    id: this._id,
    createdDate: this.createdDate,
    battleIds: this.battleIds,
    title: this.title,
    videoLink: this.videoLink,
    videoImgLink: parseEmbedId(this.videoLink),
    userId: this.userId,
    voteCountUp: this.voteCountUp,
    voteCountDown: this.voteCountDown,
    comments: this.comments
  };
};

const video = mongoose.model('video', videoSchema);

module.exports = video;
