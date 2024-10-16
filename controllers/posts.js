const { User, Post, Comment, Like } = require("../models");

const getAllPosts = async (req, res) => {
  const {
    query: { page = 1, limit = 10 },
  } = req;
  const queryPage = Number(page),
    queryLimit = Number(limit);

  try {
    const posts = await Post.findAll({
      limit: queryLimit,
      offset: (queryPage - 1) * queryLimit,
    });
    return res.status(200).json(posts);
  } catch (error) {
    console.log("Error from get posts : ", error);
    return res.status(500).json(error);
  }
};

const createPost = async (req, res) => {
  const { body, username } = req;
  try {
    const data = await Post.create({ ...body, username });
    return res.status(201).json(data);
  } catch (error) {
    console.log("Error from create post : ", error);
    return res.status(400).json(error);
  }
};

const getPostById = async (req, res) => {
  const {
    params: { id },
    query: { page = 1, limit = 10 },
  } = req;
  const queryPage = Number(page),
    queryLimit = Number(limit);

  try {
    const post = await Post.findOne({
      where: { id },
      include: [
        {
          model: Comment,
          as: "comments",
          limit: queryLimit,
          offset: (queryPage - 1) * queryLimit,
        },
        {
          model: Like,
          as: "likes",
          // limit: queryLimit,
          // offset: (queryPage - 1) * queryLimit,
        },
      ],
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

const getPostsByUserName = async (req, res) => {
  const {
    params: { username },
    query: { page = 1, limit = 10 },
  } = req;
  const queryPage = Number(page),
    queryLimit = Number(limit);

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    const post = await Post.findAll({
      where: { username },
      limit: queryLimit,
      offset: (queryPage - 1) * queryLimit,
    });
    if (!post) {
      return res.status(404).json({ error: "Post not found!" });
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
    const count = await Post.destroy({ where: { id } });
    if (count !== 1) {
      return res.status(404).json({
        error: "Post not found!",
      });
    }
    return res.status(204).json();
  } catch (error) {
    console.log("Error from delete post : ", error);
    return res.status(500).json(error);
  }
};

const deletePostsByUserName = async (req, res) => {
  const username = req.params.username;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    const count = await Post.destroy({ where: { username } });
    if (count < 1) {
      return res.status(404).json({
        message: "Post not found!",
      });
    }
    return res.status(204).json();
  } catch (error) {
    console.log("Error from delete post : ", error);
    return res.status(500).json(error);
  }
};

module.exports = {
  getAllPosts,
  createPost,
  getPostById,
  getPostsByUserName,
  deletePostById,
  deletePostsByUserName,
};
