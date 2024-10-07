const { Post } = require("../models");

const getAllPosts = async (_req, res) => {
  try {
    const posts = await Post.findAll();
    return res.status(200).json(posts);
  } catch (error) {
    console.log("Error from get posts : ", error);
    return res.status(500).json(JSON.stringify(error));
  }
};

const getSinglePost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Post.findOne({
      where: {
        id,
      },
    });
    return res.status(200).json(post);
  } catch (error) {
    console.log("Error from get post : ", error);
    return res.status(500).json(JSON.stringify(error));
  }
};

const createPost = async (req, res) => {
  const post = req.body;
  try {
    const data = await Post.create(post);
    return res.status(201).json(data);
  } catch (error) {
    console.log("Error from create post : ", error);
    return res.json(JSON.stringify(error));
  }
};

module.exports = { getAllPosts, getSinglePost, createPost };
