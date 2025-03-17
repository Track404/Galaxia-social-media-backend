const commentModel = require('../models/commentModel');

async function createComment(req, res) {
  const { content } = req.body;
  const comment = await commentModel.createComment(
    content,
    Number(req.params.postId),
    Number(req.params.authorId)
  );
  res.json({ comment: comment, message: 'Comment Created' });
}
async function createdComments(req, res) {
  const commentsData = req.body.comments;
  const createdComments = await commentModel.createComments(commentsData);

  res.json({
    comments: createdComments,
    message: `${createdComments.length} Comments Created Successfully`,
  });
}

async function getUniqueCommentById(req, res) {
  const comment = await commentModel.getCommentById(
    Number(req.params.commentId)
  );
  res.json({
    comment: comment,
    message: `Get comment ${req.params.commentId}`,
  });
}

async function getAllComments(req, res) {
  const comments = await commentModel.getAllComments();
  res.json({ comments: comments, message: `All comments` });
}

async function updateComment(req, res) {
  const { title, content } = req.body;
  const comment = await commentModel.updateComment(
    content,
    Number(req.params.commentId)
  );
  res.json({ comment: comment, message: ` comment ${req.params.id} Updated` });
}

async function deleteComment(req, res) {
  const comment = await commentModel.deleteComment(
    Number(req.params.commentId)
  );
  res.json({
    comment: comment,
    message: `Delete comment ${req.params.commentId}`,
  });
}

async function deleteAllcomments(req, res) {
  const comments = await commentModel.deleteAllComments();
  res.json({
    comments: comments,
    message: `${comments.count} comments deleted successfully`,
  });
}

module.exports = {
  createComment,
  createdComments,
  getUniqueCommentById,
  getAllComments,
  updateComment,
  deleteComment,
  deleteAllcomments,
};
