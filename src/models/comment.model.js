const mongoose = require('mongoose');

const { Schema } = mongoose;

const commentSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: false,
      trim: true,
    },
    description: {
      type: String,
      required: false,
    },
    upVote: [],
    downVote: [],
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    comment: {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    },
  },
  {
    timestamps: true,
  }
);

/**
 * @typedef User
 */
const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
