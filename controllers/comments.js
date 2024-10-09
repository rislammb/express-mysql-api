const { Comment } = require("../models");

const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.findAll();
    return res.status(200).json(comments);
  } catch (error) {
    console.log("Error from get comments : ", error);
    return res.status(500).json(error);
  }
};

const createComment = async (req, res) => {
  const comment = req.body;
  try {
    const data = await Comment.create(comment);
    return res.status(201).json(data);
  } catch (error) {
    console.log("Error from create comment : ", error);
    return res.json({ message: error.name ?? "Something went wrong!" });
  }
};

const getCommentsByPost = async (req, res) => {
  const postId = req.params.postId;
  try {
    const comments = await Comment.findAll({ where: { postId } });
    return res.status(200).json(comments);
  } catch (error) {
    console.log("Error from get comments : ", error);
    return res.status(500).json(error);
  }
};

const deleteCommentById = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Comment.destroy({ where: { id } });

    if (data !== 1) {
      return res.status(404).json({
        message: `Comment not found!`,
      });
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
