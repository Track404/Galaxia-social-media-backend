const prisma = require('../prisma/client');

async function createLikePost(authorId, postId) {
  try {
    // Validate authorId and postId
    if (!authorId || !postId) {
      throw new Error('authorId and postId are required');
    }

    // Check if the author exists
    const author = await prisma.user.findUnique({ where: { id: authorId } });
    if (!author) {
      throw new Error('User (author) not found');
    }

    // Check if the post exists
    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (!post) {
      throw new Error('Post not found');
    }

    // Create like
    const like = await prisma.like.create({
      data: {
        authorId,
        postId,
      },
    });

    return like;
  } catch (error) {
    console.error('Error creating like on post:', error.message);
    throw new Error(error.message);
  }
}

async function createLikeComment(authorId, commentId) {
  try {
    // Validate authorId and commentId
    if (!authorId || !commentId) {
      throw new Error('authorId and commentId are required');
    }

    // Check if the author exists
    const author = await prisma.user.findUnique({ where: { id: authorId } });
    if (!author) {
      throw new Error('User (author) not found');
    }

    // Check if the comment exists
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });
    if (!comment) {
      throw new Error('Comment not found');
    }

    // Create like
    const like = await prisma.like.create({
      data: {
        authorId,
        commentId,
      },
    });

    return like;
  } catch (error) {
    console.error('Error creating like on comment:', error.message);
    throw new Error(error.message);
  }
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

async function getCheckIsLikePost(authorId, postId) {
  const like = await prisma.like.findFirst({
    where: { authorId, postId },
    select: { id: true },
  });

  return {
    isLiked: !!like,
    likeId: like ? like.id : null,
  };
}

async function getCheckIsLikeComment(authorId, commentId) {
  const like = await prisma.like.findFirst({
    where: { authorId, commentId },
    select: { id: true },
  });

  return {
    isLiked: !!like,
    likeId: like ? like.id : null,
  };
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
  createLikePost,
  createLikeComment,
  createdLikes,
  getCheckIsLikePost,
  getCheckIsLikeComment,
  getLikeById,
  getAllLikes,
  updateLike,
  deleteLike,
  deleteAllLikes,
};
