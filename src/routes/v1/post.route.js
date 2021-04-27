const express = require('express');
const {
  add,
  getAll,
  getPostId,
  changeVote,
  getAllIsDraft,
  updateDraft,
  deletePost,
  likePost,
  getPostLikeByUser,
} = require('../../controllers/post.controller');

const router = express.Router();

router.get('/like', getPostLikeByUser);
router.post('/add', add);
router.get('/', getAll);
router.get('/draft/:id', getAllIsDraft);
router.put('/draft/:id', updateDraft);
router.get('/:id', getPostId);
router.put('/:id', changeVote);
router.delete('/:id', deletePost);
router.put('/like/:id', likePost);

module.exports = router;
