const router = require("express").Router();
const {
  getAllPosts,
  createPost,
  getPostById,
  deletePostById,
} = require("../controllers/posts");

router.get("/:id", getPostById);
router.delete("/:id", deletePostById);
router.post("/", createPost);
router.get("/", getAllPosts);

module.exports = router;
