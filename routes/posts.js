// const { Post } = require("../models");
const router = require("express").Router();

router.get("/", async (_req, res) => {
  try {
    // const posts = await Post.findAll();
    res.json([]);
  } catch (error) {
    console.log("Error from get posts : ", error);

    res.status(500).json(JSON.stringify(error));
  }
});

router.post("/", async (req, res) => {
  const post = req.body;
  try {
    // const data = await Post.create(post);
    res.status(201).json(post);
  } catch (error) {
    console.log("Error from create post : ", error);
    res.json(JSON.stringify(error));
  }
});

module.exports = router;
