const httpStatus = require('http-status');

const catchAsync = require('../utils/catchAsync');
const Post = require('../models/post');

const add = catchAsync(async (req, res) => {
  // const { title, description, user, category, isDraft } = req.body;
  const port = await Post.create(req.body);
  res.status(httpStatus.CREATED).send({ port });
});

const getAll = catchAsync(async (req, res) => {
  Post.find({ isDraft: false })
    .sort([['updatedAt', -1]])
    .exec(function (err, post) {
      res.status(httpStatus.CREATED).send({ post });
    });
});
const getPostId = catchAsync(async (req, res) => {
  const { id } = req.params;
  Post.find({ _id: id }).exec(function (err, post) {
    res.status(httpStatus.CREATED).send({ post: post[0] });
  });
});
module.exports = { add, getAll, getPostId };
