// models/Post.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Avoid model overwrite in dev
const Post = mongoose.models.Post || mongoose.model('Post', postSchema);
module.exports = Post;
