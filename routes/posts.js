const router = require("express").Router();
const {
  getAllPosts,
  createPost,
  getPostById,
  getPostsByUserName,
  deletePostById,
  deletePostsByUserName,
} = require("../controllers/posts");

router.get("/i/:id", getPostById);
router.get("/u/:username", getPostsByUserName);
router.delete("/i/:id", deletePostById);
router.delete("/u/:username", deletePostsByUserName);
router.post("/", createPost);
router.get("/", getAllPosts);

module.exports = router;
