const mongooose = require('mongoose');

const beatSchema = mongoose.Schema({
  createdDate: { type: Date },
  url: { type: String, required: true },
  producer: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String }
});

beatSchema.methods.toClient = function() {
  return {
    id: this._id,
    cratedDate: this.createdDate,
    url: this.url,
    producer: this.producer,
    title: this.title,
    description: this.description
  };
};

const beat = mongoose.model('beat', beatSchema);

module.exports = beat;
