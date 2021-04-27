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
    parent: {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    },
    comment: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  {
    timestamps: true,
  }
);
commentSchema.plugin(toJSON);
commentSchema.pre('findById', function (next) {
  this.populate('user');
  next();
});
/**
 * @typedef Comment
 */
const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
