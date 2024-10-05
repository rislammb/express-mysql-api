const { Post } = require("../models");

const router = require("express").Router();

router.get("/", async (_req, res) => {
  try {
    const posts = await Post.findAll();
    res.json(posts);
  } catch (error) {
    throw error;
  }
});

router.post("/", async (req, res) => {
  let post = req.body;
  try {
    post = await Post.create(post);
    res.status(201).json(post);
  } catch (error) {
    throw error;
  }
});

module.exports = router;
