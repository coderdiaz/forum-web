const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  content: {
    type: String
  },
  author: {},
  likes: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Model
const CommentModel = mongoose.model('Comment', CommentSchema);
module.exports = CommentModel;