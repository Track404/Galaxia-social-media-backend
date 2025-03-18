const { Router } = require('express');
const followRouter = Router();
const followController = require('../controllers/followController');

followRouter.get('/follow', followController.getAllFollows);
followRouter.get('/follow/:followId', followController.getUniqueFollowById);
followRouter.post(
  '/follow/:followerId/:followingId',
  followController.createFollow
);
followRouter.post('/follows', followController.createdFollows);
followRouter.delete('/follow/:followId', followController.deleteFollow);
followRouter.delete('/follows', followController.deleteAllFollows);

module.exports = followRouter;
