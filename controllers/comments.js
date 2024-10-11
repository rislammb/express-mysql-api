const { Post, Comment } = require("../models");

const getAllComments = async (req, res) => {
  const {
    query: { page = 1, limit = 10 },
  } = req;
  const queryPage = Number(page),
    queryLimit = Number(limit);

  try {
    const comments = await Comment.findAll({
      limit: queryLimit,
      offset: (queryPage - 1) * queryLimit,
    });
    return res.status(200).json(comments);
  } catch (error) {
    console.log("Error from get comments : ", error);
    return res.status(500).json(error);
  }
};

const createComment = async (req, res) => {
  const { body, username } = req;
  try {
    const data = await Comment.create({ ...body, username });
    return res.status(201).json(data);
  } catch (error) {
    console.log("Error from create comment : ", error);
    return res.status(400).json(error);
  }
};

const getCommentsByPost = async (req, res) => {
  const {
    params: { postId },
    query: { page = 1, limit = 10 },
  } = req;
  const queryPage = Number(page),
    queryLimit = Number(limit);

  try {
    const post = await Post.findOne({ where: { id: postId } });
    if (!post) {
      return res.status(404).json({ error: "Post not found!" });
    }

    const comments = await Comment.findAll({
      where: { postId },
      limit: queryLimit,
      offset: (queryPage - 1) * queryLimit,
    });
    return res.status(200).json(comments);
  } catch (error) {
    console.log("Error from get comments : ", error);
    return res.status(500).json(error);
  }
};

const deleteCommentById = async (req, res) => {
  const id = req.params.id;
  try {
    const count = await Comment.destroy({ where: { id } });

    if (count < 1) {
      return res.status(404).json({ error: "Comment not found!" });
    }
    return res.status(204).json();
  } catch (error) {
    console.log("Error from delete comment : ", error);
    return res.status(500).json(error);
  }
};

module.exports = {
  getAllComments,
  createComment,
  getCommentsByPost,
  deleteCommentById,
};
