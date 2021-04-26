const express = require('express');
const { add, getCommentByPost, changeVote, deleteComment } = require('../../controllers/comment.controller');

const router = express.Router();

router.post('/', add);
router.get('/', getCommentByPost);
router.put('/:id', changeVote);
router.delete('/:id', deleteComment);
module.exports = router;
