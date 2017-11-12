const mongoose = require('mongoose');

const beatSchema = mongoose.Schema({
  url: { type: String, required: true },
  producer: { type: String, required: true },
  title: { type: String, required: true }
});

beatSchema.methods.toClient = function() {
  return {
    id: this._id,
    url: this.url,
    producer: this.producer,
    title: this.title
  };
};

const beat = mongoose.model('beat', beatSchema);

module.exports = beat;
