const express = require('express');
const { add, getAll, getPostId } = require('../../controllers/post.controller');

const router = express.Router();

router.post('/add', add);
router.get('/', getAll);
router.get('/:id', getPostId);

module.exports = router;
