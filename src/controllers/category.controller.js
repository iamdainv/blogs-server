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
      'https://cdn-icons.flaticon.com/png/512/1183/premium/1183672.png?token=exp=1647659253~hmac=22bdd3d542d0b0652a7248de09829e3a',
    value: 1,
  },
  {
    label: 'Angular',
    image: 'https://as2.ftcdn.net/jpg/02/95/03/85/500_F_295038583_mn0uxJ6A0YO57HA4xXQqHFUjiW1BcqBE.jpg',
    value: 2,
  },
  {
    label: 'C++',
    image: 'https://cdn-icons-png.flaticon.com/128/381/381704.png',
    value: 3,
  },
  {
    label: 'C#',
    image: 'https://cdn-icons-png.flaticon.com/128/381/381704.png',
    value: 4,
  },
  {
    label: 'Hài',
    image: 'https://t3.ftcdn.net/jpg/02/25/12/76/240_F_225127687_seBj7cU3fRT28NX5zzpUn3JDz4kbWQ3E.jpg',
    value: 5,
  },
  {
    label: 'Reddit',
    image:
      'https://cdn-icons.flaticon.com/png/128/3536/premium/3536761.png?token=exp=1647659359~hmac=77c72cdd3d989f4715e9b00d28265339',
    value: 6,
  },
  {
    label: 'Quora',
    image: 'https://cdn-icons-png.flaticon.com/128/174/174865.png',
    value: 7,
  },
  {
    label: 'Tuổi teen',
    image: 'https://cdn-icons-png.flaticon.com/128/2793/2793541.png',
    value: 8,
  },
];

const add = catchAsync(async (req, res) => {
  const array = [];

  CATEGORIES.forEach(async (item) => {
    // eslint-disable-next-line no-param-reassign
    // eslint-disable-next-line no-param-reassign
    item.id = ObjectId();

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
