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
      required: true,
    },
    upVote: [],
    downVote: [],
    user: {
      type: { type: Schema.Types.ObjectId, ref: 'User' },
    },
    category: {
      type: { type: Schema.Types.ObjectId, ref: 'Category' },
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
