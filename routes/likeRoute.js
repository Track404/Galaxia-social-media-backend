const { Router } = require('express');
const likeRouter = Router();
const likeController = require('../controllers/likeController');

likeRouter.get('/like', likeController.getAllLikes);
likeRouter.get('/like/:likeId', likeController.getUniqueLikeById);
likeRouter.post('/like/:commentId/:authorId', likeController.createLikeComment);
likeRouter.post('/like/:postId/:authorId', likeController.createLikePost);

likeRouter.post('/likes', likeController.createdLikes);
likeRouter.put('/like/:likeId', likeController.updateLike); //not in use
likeRouter.delete('/like/:likeId', likeController.deleteLike);
likeRouter.delete('/likes', likeController.deleteAllLikes);

module.exports = likeRouter;
