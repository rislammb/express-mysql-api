const router = require("express").Router();
const {
  getAllComments,
  createComment,
  getCommentsByPost,
  deleteCommentById,
} = require("../controllers/comments");
const authenticate = require("../middlewares/authenticate");

router.get("/by-post-id/:postId", getCommentsByPost);
router.delete("/:id", authenticate, deleteCommentById);
router.post("/", authenticate, createComment);
router.get("/", getAllComments);

module.exports = router;
