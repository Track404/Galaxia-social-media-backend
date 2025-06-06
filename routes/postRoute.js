const { Router } = require('express');
const postRouter = Router();
const postController = require('../controllers/postController');
const pageValidation = require('../validators/pageValidation');
const validateRequest = require('../validators/validateRequest');
postRouter.get('/post', postController.getAllPosts);
//postRouter.get('/post/random', postController.getRandomPosts);
postRouter.get('/post/:postId', postController.getUniquePostById);
postRouter.post(
  '/post/:authorId',
  pageValidation.validNewPost,
  validateRequest,
  postController.createPost
);
postRouter.post('/posts', postController.createdPosts);
postRouter.put('/post/:postId', postController.updatePost);
postRouter.delete('/post/:postId', postController.deletePost);
postRouter.delete('/posts', postController.deleteAllPosts);

postRouter.delete('/user/post/:id', postController.deleteAllUserPosts);
postRouter.get('/user/post/:id', postController.getPostsByAuthorId);

module.exports = postRouter;
