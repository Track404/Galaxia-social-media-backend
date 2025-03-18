const followModel = require('../models/followModel');

async function createFollow(req, res) {
  const follow = await followModel.createFollow(
    Number(req.params.followerId),
    Number(req.params.followingId)
  );
  res.json({ follow: follow, message: 'Follow Created' });
}
async function createdFollows(req, res) {
  const followsData = req.body.follows;
  const createdfollows = await followModel.createFollows(followsData);

  res.json({
    follows: createdfollows,
    message: `${createdfollows.length} follows Created Successfully`,
  });
}

async function getUniqueFollowById(req, res) {
  const follow = await followModel.getFollowById(Number(req.params.followId));
  res.json({
    follow: follow,
    message: `Get Follow ${req.params.followId}`,
  });
}

async function getAllFollows(req, res) {
  const follows = await followModel.getAllFollows();
  res.json({ follows: follows, message: `All Follows` });
}

async function deleteFollow(req, res) {
  const follow = await followModel.deleteFollow(Number(req.params.followId));
  res.json({
    follow: follow,
    message: `Delete Follow ${req.params.followId}`,
  });
}

async function deleteAllFollows(req, res) {
  const follows = await followModel.deleteAllFollows();
  res.json({
    follows: follows,
    message: `${follows.count} Follows deleted successfully`,
  });
}

module.exports = {
  createFollow,
  createdFollows,
  getUniqueFollowById,
  getAllFollows,
  deleteFollow,
  deleteAllFollows,
};
