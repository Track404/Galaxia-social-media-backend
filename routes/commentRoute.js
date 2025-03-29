const { Router } = require('express');
const commentRouter = Router();
const commentController = require('../controllers/commentController');
const pageValidation = require('../validators/pageValidation');
const validateRequest = require('../validators/validateRequest');
commentRouter.get('/comment', commentController.getAllComments);
commentRouter.get(
  '/comment/:commentId',
  commentController.getUniqueCommentById
);
commentRouter.post(
  '/comment/:postId/:authorId',
  pageValidation.validNewComment,
  validateRequest,
  commentController.createComment
);
commentRouter.post('/comments', commentController.createdComments);
commentRouter.put('/comment/:commentId', commentController.updateComment);
commentRouter.delete('/comment/:commentId', commentController.deleteComment);
commentRouter.delete('/comments', commentController.deleteAllcomments);

module.exports = commentRouter;
