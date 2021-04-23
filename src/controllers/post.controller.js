const httpStatus = require('http-status');

const catchAsync = require('../utils/catchAsync');
const Post = require('../models/post');

const add = catchAsync(async (req, res) => {
  // const { title, description, user, category, isDraft } = req.body;
  const port = await Post.create(req.body);
  res.status(httpStatus.CREATED).send({ port });
});

const getAll = catchAsync(async (req, res) => {
  await Post.find({ isDraft: false })
    .populate('user')
    .populate('category')
    .sort([['updatedAt', -1]])
    .exec(function (err, post) {
      res.status(200).send({ post });
    });
});
const getPostId = catchAsync(async (req, res) => {
  const { id } = req.params;
  await Post.find({ _id: id })
    .populate('user')
    .populate('category')
    .exec(function (err, post) {
      res.status(200).send({ post: post[0] });
    });
});

const changeVote = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { type, user } = req.body;
  const userId = user.id;
  await Post.findOne({ _id: id })
    .populate('user')
    .populate('category')
    .exec(function (err, post) {
      if (type === 'up' && !post.upVote.includes(userId)) {
        post.upVote.push(userId);
        post.downVote = post.downVote.filter((vote) => vote !== userId);
      } else if (post.upVote.includes(userId)) {
        post.upVote = post.upVote.filter((vote) => vote !== userId);
      }

      if (type === 'down' && !post.downVote.includes(userId)) {
        post.downVote.push(userId);
        post.upVote = post.upVote.filter((vote) => vote !== userId);
      } else if (post.downVote.includes(userId)) {
        post.downVote = post.downVote.filter((vote) => vote !== userId);
      }
      post.save();
      res.status(200).send({ post });
    });
  // eslint-disable-next-line no-console
});
module.exports = { add, getAll, getPostId, changeVote };
