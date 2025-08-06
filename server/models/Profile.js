const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fullName:{
    type:String,
    required:true
  },
  bio: String,
  education: String,
  skills: [String],
  location: String
});

module.exports = mongoose.model('Profile', profileSchema);
