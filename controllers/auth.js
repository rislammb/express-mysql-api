const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const saltRounds = 10;

const createUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    await User.create({ username, password: hash });
    return res.status(201).json({ message: "User created." });
  } catch (error) {
    console.log("Error from create user : ", error);
    return res.status(400).json(error);
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(404).json({ error: "Wrong username or password!" });
    }
    const token = jwt.sign(
      {
        data: { username },
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    return res.status(200).json({ username, token });
  } catch (error) {
    console.log("Error from create user : ", error);
    return res.status(400).json(error);
  }
};

const verifyToken = (req, res) => {
  res.status(200).json({ username: req.username });
};

module.exports = {
  createUser,
  login,
  verifyToken,
};
