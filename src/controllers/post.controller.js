const httpStatus = require('http-status');

const catchAsync = require('../utils/catchAsync');
const Post = require('../models/post');

const add = catchAsync(async (req, res) => {
  // const { title, description, user, category, isDraft } = req.body;
  const post = await Post.create(req.body);
  res.status(httpStatus.CREATED).send({ post });
});

const getAll = catchAsync(async (req, res) => {
  Post.find({ isDraft: false })
    .populate('user')
    .populate('category')
    .sort([['updatedAt', -1]])
    .exec(function (err, post) {
      res.status(200).send({ post });
    });
});

/**
 * @param id id is userid
 */
const getAllIsDraft = catchAsync(async (req, res) => {
  const { id } = req.params;

  Post.find({ isDraft: true, user: id })
    .populate('user')
    .populate('category')
    .sort([['updatedAt', -1]])
    .exec(function (err, post) {
      res.status(200).send({ post });
    });
});
const getPostId = catchAsync(async (req, res) => {
  const { id } = req.params;
  Post.find({ _id: id })
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
  Post.findOne({ _id: id })
    .populate('user')
    .populate('category')
    .exec(function (err, post) {
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

const updateDraft = catchAsync(async (req, res) => {
  const { title, description, category } = req.body;
  const { id } = req.params;
  const post = await Post.findOne({ _id: id });
  post.title = title;
  post.description = description;
  post.category = category;
  await post.save();
  res.status(202).send({ post });
});

const deletePost = catchAsync(async (req, res) => {
  const { id } = req.params;
  const post = await Post.remove({ _id: id });
  res.status(202).send({ post });
});

module.exports = { add, getAll, getPostId, changeVote, getAllIsDraft, updateDraft, deletePost };
