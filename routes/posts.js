const { Post } = require("../models");
const router = require("express").Router();

router.get("/", async (_req, res) => {
  try {
    const posts = await Post.findAll();
    res.json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  const post = req.body;
  try {
    const data = await Post.create(post);
    res.status(201).json(data);
  } catch (error) {
    res.status(error.code || 400).json(error);
  }
});

module.exports = router;
