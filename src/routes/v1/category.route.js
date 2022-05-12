const express = require('express');
const { add, getAll } = require('../../controllers/category.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.get('/v1/category/add', add);
router.get('/v1/category/', auth(), getAll);

module.exports = router;
