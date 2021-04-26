const httpStatus = require('http-status');

const catchAsync = require('../utils/catchAsync');
const Comment = require('../models/comment.model');

const add = catchAsync(async (req, res) => {
  // const { title, description, user, category, isDraft } = req.body;
  const comment = await Comment.create(req.body);
  res.status(httpStatus.CREATED).send({ comment });
});

const getCommentByPost = catchAsync(async (req, res) => {
  const idPost = req.query.post || null;

  await Comment.find({ post: idPost })
    .populate('user')
    // .populate('post')
    .sort([
      ['updatedAt', -1],
      ['upVote.length', -1],
    ])
    .exec(function (err, comment) {
      res.status(200).send({ comment });
    });
});

const changeVote = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { type, user } = req.body;
  const userId = user.id;
  Comment.findOne({ _id: id }).exec(function (err, post) {
    if (type === 'up' && !post.upVote.includes(userId)) {
      post.upVote.push(userId);
      // eslint-disable-next-line no-param-reassign
      post.downVote = post.downVote.filter((vote) => vote !== userId);
    } else if (post.upVote.includes(userId)) {
      // eslint-disable-next-line no-param-reassign
      post.upVote = post.upVote.filter((vote) => vote !== userId);
    }

    if (type === 'down' && !post.downVote.includes(userId)) {
      post.downVote.push(userId);
      // eslint-disable-next-line no-param-reassign
      post.upVote = post.upVote.filter((vote) => vote !== userId);
    } else if (post.downVote.includes(userId)) {
      // eslint-disable-next-line no-param-reassign
      post.downVote = post.downVote.filter((vote) => vote !== userId);
    }
    post.save();
    res.status(200).send({ post });
  });
  // eslint-disable-next-line no-console
});

const deleteComment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const comment = await Comment.remove({ _id: id });
  res.status(202).send({ comment });
});

module.exports = { add, getCommentByPost, changeVote, deleteComment };
