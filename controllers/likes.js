const { Like } = require("../models");

const getAllLikes = async (_req, res) => {
  try {
    const likes = await Like.findAll();
    return res.status(200).json(likes);
  } catch (error) {
    console.log("Error from get all likes : ", error);
    return res.status(500).json(error);
  }
};

const getLikesByPost = async (req, res) => {
  const { postId } = req.params;
  try {
    const likes = await Like.findAll({ where: { postId } });
    return res.status(200).json(likes);
  } catch (error) {
    console.log("Error from get likes by post id: ", error);
    return res.status(500).json(error);
  }
};

const toggleLike = async (req, res) => {
  const {
    params: { postId },
    username,
  } = req;
  try {
    const like = await Like.findOne({ where: { postId, username } });

    if (like) {
      await like.destroy();
      return res.status(204).json();
    } else {
      await Like.create({ postId, username });
      return res.status(201).json({ message: "Like success" });
    }
  } catch (error) {
    console.log("Error from toogle like : ", error);
    return res.status(500).json(error);
  }
};

module.exports = { getAllLikes, getLikesByPost, toggleLike };
