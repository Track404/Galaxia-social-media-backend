const prisma = require('../prisma/client');

async function createFollow(firstUserId, secondUserId) {
  const follow = await prisma.follow.create({
    data: {
      followerId: firstUserId,
      followingId: secondUserId,
    },
  });
  return follow;
}

async function createFollows(follows) {
  const createdFollows = await prisma.follow.createMany({
    data: follows,
  });
  return createdFollows;
}

async function getFollowById(followId) {
  const follow = await prisma.follow.findUnique({
    where: {
      id: followId,
    },
  });
  return follow;
}

async function getAllFollows() {
  const follows = await prisma.follow.findMany({
    orderBy: {
      createdAt: 'asc',
    },
  });
  return follows;
}

async function deleteFollow(followId) {
  const follow = await prisma.follow.delete({
    where: {
      id: followId,
    },
  });
  return follow;
}

async function deleteAllFollows() {
  const follows = await prisma.follow.deleteMany();
  return follows;
}

module.exports = {
  createFollow,
  createFollows,
  getFollowById,
  getAllFollows,
  deleteFollow,
  deleteAllFollows,
};
