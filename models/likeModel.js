const prisma = require('../prisma/client');

async function createLike(authorId, postId = null, commentId = null) {
  const like = await prisma.like.create({
    data: {
      authorId: authorId,
      postId: postId,
      commentId: commentId,
    },
  });
  return like;
}

async function createdLikes(likes) {
  const createdLikes = await prisma.like.createMany({
    data: likes,
  });
  return createdLikes;
}

async function getLikeById(likeId) {
  const like = await prisma.like.findUnique({
    where: {
      id: likeId,
    },
  });
  return like;
}

async function getAllLikes() {
  const likes = await prisma.like.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
  return likes;
}

async function updateLike(postId, commentId, likeId) {
  const like = await prisma.like.update({
    where: {
      id: likeId,
    },
    data: {
      postId: postId,
      commentId: commentId,
    },
  });
  return like;
}

async function deleteLike(likeId) {
  const like = await prisma.like.delete({
    where: {
      id: likeId,
    },
  });
  return like;
}

async function deleteAllLikes() {
  const likes = await prisma.like.deleteMany();
  return likes;
}

module.exports = {
  createLike,
  createdLikes,
  getLikeById,
  getAllLikes,
  updateLike,
  deleteLike,
  deleteAllLikes,
};
