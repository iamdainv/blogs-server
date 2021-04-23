const express = require('express');
const { add, getAll, getPostId, changeVote } = require('../../controllers/post.controller');

const router = express.Router();

router.post('/add', add);
router.get('/', getAll);
router.get('/:id', getPostId);
router.put('/:id', changeVote);

module.exports = router;
