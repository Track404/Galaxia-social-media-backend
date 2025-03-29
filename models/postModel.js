const prisma = require('../prisma/client');

async function createPost(title, content, authorId, publicId) {
  const post = await prisma.post.create({
    data: {
      title: title,
      content: content,
      authorId: authorId,
      imagePublicId: publicId,
    },
  });
  return post;
}

async function createPosts(posts) {
  const createdPosts = await prisma.post.createMany({
    data: posts,
  });
  return createdPosts;
}

async function getPostById(postId) {
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          imageUrl: true,
        },
      },
      _count: {
        select: { Likes: true, Comments: true },
      },
      Comments: {
        include: {
          author: true,
          _count: {
            select: { Likes: true },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  });
  return post;
}

async function getPostsByAuthorId(authorId) {
  const posts = await prisma.post.findMany({
    where: {
      authorId: authorId,
    },
    take: 10,
    include: {
      author: {
        select: {
          id: true,
          name: true,
          imageUrl: true,
        },
      },
      _count: {
        select: {
          Likes: true,
          Comments: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return posts;
}

async function getAllPosts() {
  const posts = await prisma.post.findMany({
    take: 10,
    distinct: ['authorId'],
    include: {
      author: {
        select: {
          id: true,
          name: true,
          imageUrl: true,
        },
      },
      _count: {
        select: {
          Likes: true,
          Comments: true,
        },
      },
    },

    orderBy: {
      createdAt: 'desc',
    },
  });
  return posts;
}

const getRandomPosts = async () => {
  const posts = await prisma.post.findMany({
    take: 3,
    orderBy: { random: {} },
  });

  return posts;
};

async function updatePost(title, content, postId) {
  const user = await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      title: title,
      content: content,
    },
  });
  return user;
}

async function deletePost(postId) {
  const post = await prisma.post.delete({
    where: {
      id: postId,
    },
  });
  return post;
}

async function deleteAllUserPosts(authorId) {
  const posts = await prisma.post.deleteMany({
    where: {
      authorId: authorId,
    },
  });
  return posts;
}

async function deleteAllPosts() {
  const posts = await prisma.post.deleteMany();
  return posts;
}

module.exports = {
  createPost,
  createPosts,
  getPostById,
  getPostsByAuthorId,
  getAllPosts,
  getRandomPosts,
  updatePost,
  deletePost,
  deleteAllUserPosts,
  deleteAllPosts,
};
