const { Router } = require('express');
const likeRouter = Router();
const likeController = require('../controllers/likeController');

likeRouter.get('/like', likeController.getAllLikes);
likeRouter.get('/like/:likeId', likeController.getUniqueLikeById);
likeRouter.get(
  '/like/post/:postId/:authorId',
  likeController.getCheckIsLikePost
);
likeRouter.get(
  '/like/post/:commentId/:authorId',
  likeController.getCheckIsLikeComment
);
likeRouter.post(
  '/like/comment/:commentId/:authorId',
  likeController.createLikeComment
);
likeRouter.post('/like/post/:postId/:authorId', likeController.createLikePost);

likeRouter.post('/likes', likeController.createdLikes);
likeRouter.put('/like/:likeId', likeController.updateLike); //not in use
likeRouter.delete('/like/:likeId', likeController.deleteLike);
likeRouter.delete('/likes', likeController.deleteAllLikes);

module.exports = likeRouter;
