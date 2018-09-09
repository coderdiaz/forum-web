const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PublicationSchema = new Schema({
  title: {
    type: String
  },
  content: {
    type: String
  },
  slug: {
    type: String
  },
  author: {
    name: {
      type: String
    },
    github: {
      type: String
    },
    providerId: {
      type: String
    }
  },
  tags: [String],
  likes: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Model
const PublicationModel = mongoose.model('Publication', PublicationSchema);
module.exports = PublicationModel;