const postModel = require('../models/postModel');

async function createPost(req, res) {
  const { title, content } = req.body;
  const post = await postModel.createPost(
    title,
    content,
    Number(req.params.authorId)
  );
  res.json({ post: post, message: 'Post Created' });
}
async function createdPosts(req, res) {
  const postsData = req.body.posts;
  const createdPosts = await postModel.createPosts(postsData);

  res.json({
    posts: createdPosts,
    message: `${createdPosts.length} Posts Created Successfully`,
  });
}

async function getUniquePostById(req, res) {
  const post = await postModel.getPostById(Number(req.params.postId));
  res.json({ post: post, message: `Get Post ${req.params.postId}` });
}

async function getPostsByAuthorId(req, res) {
  const posts = await postModel.getPostsByAuthorId(Number(req.params.id));
  res.json({
    posts: posts,
    message: `Get All Posts From User ${req.params.id}`,
  });
}

async function getAllPosts(req, res) {
  const posts = await postModel.getAllPosts();
  res.json({ posts: posts, message: `All Posts` });
}
async function getRandomPosts(req, res) {
  const posts = await postModel.getRandomPosts();
  res.json({ posts: posts, message: `All Posts` });
}
async function updatePost(req, res) {
  const { title, content } = req.body;
  const post = await postModel.updatePost(
    title,
    content,
    Number(req.params.postId)
  );
  res.json({ post: post, message: ` Post ${req.params.id} Updated` });
}

async function deletePost(req, res) {
  const post = await postModel.deletePost(Number(req.params.postId));
  res.json({ post: post, message: `Delete Post ${req.params.postId}` });
}

async function deleteAllUserPosts(req, res) {
  const posts = await postModel.deleteAllPosts(Number(req.params.postId));
  res.json({
    posts: posts,
    message: `${posts.count} Posts deleted successfully from User ${req.params.id}`,
  });
}

async function deleteAllPosts(req, res) {
  const posts = await postModel.deleteAllPosts();
  res.json({
    posts: posts,
    message: `${posts.count} Posts deleted successfully`,
  });
}

module.exports = {
  createPost,
  createdPosts,
  getUniquePostById,
  getPostsByAuthorId,
  getAllPosts,
  updatePost,
  deletePost,
  deleteAllUserPosts,
  deleteAllPosts,
};
