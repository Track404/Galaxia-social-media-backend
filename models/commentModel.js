const prisma = require('../prisma/client');

async function createComment(content, postId, authorId) {
  const comment = await prisma.comment.create({
    data: {
      content: content,
      postId: postId,
      authorId: authorId,
    },
  });
  return comment;
}

async function createComments(comments) {
  const createdComments = await prisma.comment.createMany({
    data: comments,
  });
  return createdComments;
}

async function getCommentById(commentId) {
  const comment = await prisma.comment.findUnique({
    where: {
      id: commentId,
    },
  });
  return comment;
}

async function getAllComments() {
  const comments = await prisma.comment.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
  return comments;
}

async function updateComment(content, commentId) {
  const post = await prisma.comment.update({
    where: {
      id: commentId,
    },
    data: {
      content: content,
    },
  });
  return post;
}

async function deleteComment(commentId) {
  const comment = await prisma.comment.delete({
    where: {
      id: commentId,
    },
  });
  return comment;
}

async function deleteAllComments() {
  const comments = await prisma.comment.deleteMany();
  return comments;
}

module.exports = {
  createComment,
  createComments,
  getCommentById,
  getAllComments,
  updateComment,
  deleteComment,
  deleteAllComments,
};
