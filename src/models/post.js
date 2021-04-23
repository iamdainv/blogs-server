const mongoose = require('mongoose');

const { Schema } = mongoose;

const portSchema = mongoose.Schema(
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
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: false,
    },
    isDraft: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * @typedef User
 */
const User = mongoose.model('Post', portSchema);

module.exports = User;
