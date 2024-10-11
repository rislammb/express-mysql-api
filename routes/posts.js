const router = require("express").Router();
const {
  getAllPosts,
  createPost,
  getPostById,
  getPostsByUserName,
  deletePostById,
  deletePostsByUserName,
} = require("../controllers/posts");
const authenticate = require("../middlewares/authenticate");

router.get("/i/:id", getPostById);
router.get("/u/:username", getPostsByUserName);
router.delete("/i/:id", authenticate, deletePostById);
router.delete("/u/:username", authenticate, deletePostsByUserName);
router.post("/", authenticate, createPost);
router.get("/", getAllPosts);

module.exports = router;
