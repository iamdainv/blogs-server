const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const categoryRoute = require('./category.route');
const postRoute = require('./post.route');
const docsRoute = require('./docs.route');
const commentRoute = require('./comment.route');
// const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '',
    route: authRoute,
  },
  {
    path: '',
    route: userRoute,
  },
  {
    path: '',
    route: categoryRoute,
  },
  {
    path: '',
    route: postRoute,
  },
  {
    path: '',
    route: commentRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
// if (config.env === 'development') {
devRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
// }

module.exports = router;
