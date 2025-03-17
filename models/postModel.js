const prisma = require('../prisma/client');

async function createPost(title, content, authorId) {
  const post = await prisma.post.create({
    data: {
      title: title,
      content: content,
      authorId: authorId,
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
  });
  return post;
}

async function getPostsByAuthorId(authorId) {
  const posts = await prisma.post.findMany({
    where: {
      authorId: authorId,
    },
  });
  return posts;
}

async function getAllPosts() {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
  return posts;
}

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
  updatePost,
  deletePost,
  deleteAllUserPosts,
  deleteAllPosts,
};
