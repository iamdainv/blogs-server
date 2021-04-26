const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const { Schema } = mongoose;

const commentSchema = mongoose.Schema(
  {
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
    post: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
commentSchema.plugin(toJSON);
/**
 * @typedef Comment
 */
const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
