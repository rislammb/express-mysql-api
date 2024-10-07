const router = require("express").Router();
const { Post } = require("../models");

router.get("/", async (_req, res) => {
  try {
    const posts = await Post?.findAll();
    return res.status(200).json(posts);
  } catch (error) {
    console.log("Error from get posts : ", error);
    return res.status(500).json(JSON.stringify(error));
  }
});

router.post("/", async (req, res) => {
  const post = req.body;
  try {
    const data = await Post?.create(post);
    return res.status(201).json(data);
  } catch (error) {
    console.log("Error from create post : ", error);
    return res.json(JSON.stringify(error));
  }
});

module.exports = router;
