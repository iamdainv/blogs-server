const express = require('express');
const { add, getCommentByPost, changeVote, deleteComment } = require('../../controllers/comment.controller');

const router = express.Router();

router.post('/v1/comment/', add);
router.get('/v1/comment/', getCommentByPost);
router.put('/v1/comment/:id', changeVote);
router.delete('/v1/comment/:id', deleteComment);
module.exports = router;
