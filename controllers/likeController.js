const likeModel = require('../models/likeModel');

async function createLikePost(req, res) {
  const like = await likeModel.createLikePost(
    Number(req.params.authorId),
    Number(req.params.postId)
  );
  res.json({ like: like, message: 'Like Created on Post' });
}

async function createLikeComment(req, res) {
  const like = await likeModel.createLikeComment(
    Number(req.params.authorId),
    Number(req.params.commentId)
  );
  res.json({ like: like, message: 'Like Created on Comment' });
}
async function createdLikes(req, res) {
  const LikesData = req.body.Likes;
  const createdLikes = await likeModel.createdLikes(LikesData);

  res.json({
    Likes: createdLikes,
    message: `${createdLikes.length} Likes Created Successfully`,
  });
}

async function getUniqueLikeById(req, res) {
  const like = await likeModel.getLikeById(Number(req.params.likeId));
  res.json({
    like: like,
    message: `Get like ${req.params.likeId}`,
  });
}

async function getAllLikes(req, res) {
  const likes = await likeModel.getAllLikes();
  res.json({ likes: likes, message: `All Likes` });
}

async function updateLike(req, res) {
  const like = await likeModel.updateLike(
    Number(req.params.postId),
    Number(req.params.commentId),
    Number(req.params.LikeId)
  );
  res.json({ like: like, message: ` like ${req.params.likeId} Updated` });
}

async function deleteLike(req, res) {
  const like = await likeModel.deleteLike(Number(req.params.LikeId));
  res.json({
    like: like,
    message: `Delete like ${req.params.LikeId}`,
  });
}

async function deleteAllLikes(req, res) {
  const Likes = await likeModel.deleteAllLikes();
  res.json({
    Likes: Likes,
    message: `${Likes.count} Likes deleted successfully`,
  });
}

module.exports = {
  createLikePost,
  createLikeComment,
  createdLikes,
  getUniqueLikeById,
  getAllLikes,
  updateLike,
  deleteLike,
  deleteAllLikes,
};
