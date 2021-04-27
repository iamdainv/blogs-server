const httpStatus = require('http-status');

const catchAsync = require('../utils/catchAsync');
const Post = require('../models/post');
const Category = require('../models/category');
const User = require('../models/user.model');

const add = catchAsync(async (req, res) => {
  // const { title, description, user, category, isDraft } = req.body;
  const post = await Post.create(req.body);
  if (req.body.isDraft === false) {
    const category = await Category.findOne({ _id: req.body.category });
    category.numberOfMember += 1;
    category.save();
  }

  res.status(httpStatus.CREATED).send({ post });
});

const getAll = catchAsync(async (req, res) => {
  const idCategory = req.query.category || null;
  let search = req.query.search || null;
  const user = req.query.user || null;
  if (user) {
    await Post.find({ isDraft: false, user })

      .populate('user')
      .populate('category')

      .sort([
        ['numberOfComment', 1],
        ['updatedAt', -1],
      ])
      .exec(function (err, post) {
        res.status(200).send({ post });
      });
    return;
  }
  if (search) {
    // eslint-disable-next-line security/detect-non-literal-regexp
    search = new RegExp(search, 'i');
    await Post.find({ isDraft: false })
      .or([{ title: search }, { description: search }, { 'category.name': search }])
      .populate('user')
      .populate('category')

      .sort([
        ['numberOfComment', 1],
        ['updatedAt', -1],
      ])
      .exec(function (err, post) {
        res.status(200).send({ post });
      });
    return;
  }

  if (idCategory !== null) {
    await Post.find({ isDraft: false, category: idCategory })

      .populate('user')
      .populate('category')
      .sort([
        ['numberOfComment', 1],
        ['updatedAt', -1],
      ])
      .exec(function (err, post) {
        res.status(200).send({ post });
      });
  } else {
    await Post.find({ isDraft: false })

      .populate('user')
      .populate('category')
      .sort([
        ['numberOfComment', -1],
        ['updatedAt', -1],
      ])
      .exec(function (err, post) {
        res.status(200).send({ post });
      });
  }
});

/**
 * @param id id is userid
 */
const getAllIsDraft = catchAsync(async (req, res) => {
  const { id } = req.params;

  return Post.find({ isDraft: true, user: id })
    .populate('user')
    .populate('category')
    .sort([['updatedAt', -1]])
    .exec(function (err, post) {
      res.status(200).send({ post });
    });
});
const getPostId = catchAsync(async (req, res) => {
  const { id } = req.params;
  return Post.findOne({ _id: id })
    .populate('user')
    .populate('category')
    .exec(function (err, post) {
      res.status(200).send({ post });
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
      return res.status(200).send({ post });
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
  return res.status(202).send({ post });
});

const deletePost = catchAsync(async (req, res) => {
  const { id } = req.params;
  const post = await Post.remove({ _id: id });
  return res.status(202).send({ post });
});

const likePost = catchAsync(async (req, res) => {
  const { user } = req.body;
  const { id } = req.params;
  const post = await Post.findOne({ _id: id }).populate('user').populate('category');
  const users = await User.findOne({ _id: user });
  if (!post.likePost.includes(user)) {
    post.likePost.push(user);
    users.likePost.push(id);
  } else {
    post.likePost.splice(post.likePost.indexOf(user), 1);
    users.likePost.splice(users.likePost.indexOf(id), 1);
  }
  await users.save();
  await post.save();

  return res.status(202).send({ userLikePost: post.populate('likePost'), post });
});

const getPostLikeByUser = catchAsync(async (req, res) => {
  const { user } = req.query;

  const users = await User.findOne({ _id: user }).populate('likePost');

  return res.status(200).send({ post: users.likePost });
});
module.exports = { add, getAll, getPostId, changeVote, getAllIsDraft, updateDraft, deletePost, likePost, getPostLikeByUser };
