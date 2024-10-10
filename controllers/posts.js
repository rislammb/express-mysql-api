const { Post, Comment } = require("../models");

const getAllPosts = async (_req, res) => {
  try {
    const posts = await Post.findAll();
    return res.status(200).json(posts);
  } catch (error) {
    console.log("Error from get posts : ", error);
    return res.status(500).json(error);
  }
};

const createPost = async (req, res) => {
  const post = req.body;
  try {
    const data = await Post.create(post);
    return res.status(201).json(data);
  } catch (error) {
    console.log("Error from create post : ", error);
    return res.json(error);
  }
};

const getPostById = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Post.findOne({
      where: { id },
      include: [{ model: Comment, as: "comments" }],
    });
    if (!post) {
      return res.status(404).json({ message: "Post not found!" });
    }
    return res.status(200).json(post);
  } catch (error) {
    console.log("Error from get post : ", error);
    return res.status(500).json(error);
  }
};

const deletePostById = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Post.destroy({ where: { id } });

    if (data !== 1) {
      return res.status(404).json({
        message: `Post not found!`,
      });
    }
    return res.status(204).json();
  } catch (error) {
    console.log("Error from delete post : ", error);
    return res.status(500).json(error);
  }
};

module.exports = { getAllPosts, createPost, getPostById, deletePostById };
