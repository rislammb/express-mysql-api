const { User, Post } = require("../models");

const getUsers = async (req, res) => {
  const {
    query: { page = 1, limit = 10 },
  } = req;
  const queryPage = Number(page),
    queryLimit = Number(limit);

  try {
    const users = await User.findAll({
      attributes: ["username", "createdAt", "updatedAt"],
      limit: queryLimit,
      offset: (queryPage - 1) * queryLimit,
    });
    return res.status(200).json(users);
  } catch (error) {
    console.log("Error from get users : ", error);
    return res.json(error);
  }
};

const getUserByUserName = async (req, res) => {
  const {
    params: { username },
    query: { page = 1, limit = 10 },
  } = req;
  const queryPage = Number(page),
    queryLimit = Number(limit);

  try {
    const user = await User.findOne({
      where: { username },
      attributes: ["username", "createdAt", "updatedAt"],
      include: [
        {
          model: Post,
          as: "posts",
          limit: queryLimit,
          offset: (queryPage - 1) * queryLimit,
        },
      ],
    });
    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log("Error from get user : ", error);
    return res.json(error);
  }
};

const deleteUserByUserName = async (req, res) => {
  const { username } = req.params;
  try {
    const count = await User.destroy({ where: { username } });
    if (count < 1) {
      return res.status(404).json({
        message: "User not found!",
      });
    }
    return res.status(204).json();
  } catch (error) {
    console.log("Error from delete user : ", error);
    return res.json(error);
  }
};

module.exports = {
  getUsers,
  getUserByUserName,
  deleteUserByUserName,
};
