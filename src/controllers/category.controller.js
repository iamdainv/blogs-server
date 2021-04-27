const httpStatus = require('http-status');
const ObjectId = require('mongodb').ObjectID;
const catchAsync = require('../utils/catchAsync');
const Category = require('../models/category');

const CATEGORIES = [
  {
    label: 'Bảng tin',
    image:
      'https://www.flaticon.com/svg/vstatic/svg/2965/2965879.svg?token=exp=1619500198~hmac=c28f0ddcf31a9c4fb8fae3bf2bcfe626',
    value: 0,
  },
  {
    label: 'React Js',
    image:
      'https://www.flaticon.com/svg/vstatic/svg/1126/1126012.svg?token=exp=1619500153~hmac=260f1af8ade32b67c8d4476b73aedea6',
    value: 1,
  },
  {
    label: 'Angular',
    image: 'https://as2.ftcdn.net/jpg/02/95/03/85/500_F_295038583_mn0uxJ6A0YO57HA4xXQqHFUjiW1BcqBE.jpg',
    value: 2,
  },
  {
    label: 'C++',
    image:
      'https://www.flaticon.com/svg/vstatic/svg/541/541574.svg?token=exp=1619500260~hmac=9b9a0be1e8d62912110f7894f162cba0',
    value: 3,
  },
  {
    label: 'C#',
    image:
      'https://www.flaticon.com/svg/vstatic/svg/381/381704.svg?token=exp=1619500283~hmac=8d62c67f5980c84dce2b9212ab9d8904',
    value: 4,
  },
  {
    label: 'Hài',
    image: 'https://image.flaticon.com/icons/png/128/2959/2959113.png',
    value: 5,
  },
  {
    label: 'Reddit',
    image: 'https://www.flaticon.com/premium-icon/icons/svg/3670/3670226.svg',
    value: 6,
  },
  {
    label: 'Quora',
    image: 'https://www.flaticon.com/premium-icon/icons/svg/3015/3015827.svg',
    value: 7,
  },
  {
    label: 'Tuổi teen',
    image: 'https://image.flaticon.com/icons/png/128/1985/1985901.png',
    value: 8,
  },
];

const add = catchAsync(async (req, res) => {
  const array = [];

  CATEGORIES.forEach(async (item) => {
    // eslint-disable-next-line no-param-reassign
    // eslint-disable-next-line no-param-reassign
    item.id = ObjectId();
    // eslint-disable-next-line no-param-reassign
    // eslint-disable-next-line no-self-assign
    item.image = item.image;
    item.name = item.label;
    const c = await Category.create(item);
    array.push(c);
    // eslint-disable-next-line no-plusplus
  });

  res.status(httpStatus.CREATED).send({ array });
});

const getAll = catchAsync(async (req, res) => {
  Category.find({})
    .sort([['createdAt', 1]])
    .exec(function (err, category) {
      res.status(httpStatus.CREATED).send({ category });
    });
});

module.exports = { add, getAll };
