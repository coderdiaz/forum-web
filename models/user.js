const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String
  },
  name: {
    type: String
  },
  social: {
    github: {
      type: String
    }
  },
  providerId: {
    type: String
  }
}, {
  timestamps: true
});

// Model
const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;