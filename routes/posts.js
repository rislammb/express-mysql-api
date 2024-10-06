const { Post } = require("../models");
const router = require("express").Router();

router.get("/", async (_req, res) => {
  try {
    const posts = await Post.findAll();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
});

router.post("/", async (req, res) => {
  let post = req.body;
  try {
    post = await Post.create(post);
    res.status(201).json(post);
  } catch (error) {
    res.json({ message: "Something went wrong!" });
  }
});

module.exports = router;
