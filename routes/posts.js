const router = require("express").Router();
const {
  getAllPosts,
  createPost,
  getSinglePost,
} = require("../controllers/posts");

router.get("/:id", getSinglePost);
router.get("/", getAllPosts);
router.post("/", createPost);

module.exports = router;
