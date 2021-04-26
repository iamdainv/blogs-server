const httpStatus = require('http-status');

const catchAsync = require('../utils/catchAsync');
const Comment = require('../models/comment.model');
const Post = require('../models/post');

const add = catchAsync(async (req, res) => {
  // const { title, description, user, category, isDraft } = req.body;
  const comment = await Comment.create(req.body);
  const post = await Post.findOne({ _id: req.body.post });
  post.numberOfComment += 1;
  await post.save();
  res.status(httpStatus.CREATED).send({ comment });
});

const getCommentByPost = catchAsync(async (req, res) => {
  const idPost = req.query.post || null;

  await Comment.find({ post: idPost })
    .populate('user')
    // .populate('post')
    .sort([
      ['upVote.length', 1],
      ['updatedAt', -1],
    ])
    .exec(function (err, comment) {
      res.status(200).send({ comment });
    });
});

const changeVote = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { type, user } = req.body;
  const userId = user.id;
  Comment.findOne({ _id: id }).exec(function (err, comment) {
    if (type === 'up' && !comment.upVote.includes(userId)) {
      comment.upVote.push(userId);
      // eslint-disable-next-line no-param-reassign
      comment.downVote = comment.downVote.filter((vote) => vote !== userId);
    } else if (comment.upVote.includes(userId)) {
      // eslint-disable-next-line no-param-reassign
      comment.upVote = comment.upVote.filter((vote) => vote !== userId);
    }

    if (type === 'down' && !comment.downVote.includes(userId)) {
      comment.downVote.push(userId);
      // eslint-disable-next-line no-param-reassign
      comment.upVote = comment.upVote.filter((vote) => vote !== userId);
    } else if (comment.downVote.includes(userId)) {
      // eslint-disable-next-line no-param-reassign
      comment.downVote = comment.downVote.filter((vote) => vote !== userId);
    }
    comment.save();
    res.status(200).send({ comment });
  });
  // eslint-disable-next-line no-console
});

const deleteComment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const comment = await Comment.remove({ _id: id });
  res.status(202).send({ comment });
});

module.exports = { add, getCommentByPost, changeVote, deleteComment };
