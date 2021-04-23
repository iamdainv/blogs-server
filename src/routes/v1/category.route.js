const express = require('express');
const { add, getAll } = require('../../controllers/category.controller');

const router = express.Router();

router.get('/add', add);
router.get('/', getAll);

module.exports = router;
