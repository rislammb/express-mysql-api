const router = require("express").Router();
const {
  getAllComments,
  createComment,
  getCommentsByPost,
  deleteCommentById,
} = require("../controllers/comments");

router.get("/by-post-id/:postId", getCommentsByPost);
router.delete("/:id", deleteCommentById);
router.post("/", createComment);
router.get("/", getAllComments);

module.exports = router;
