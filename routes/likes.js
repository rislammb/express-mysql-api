const router = require("express").Router();
const {
  getAllLikes,
  getLikesByPost,
  toggleLike,
} = require("../controllers/likes");
const authenticate = require("../middlewares/authenticate");

router.get("/p/:postId", getLikesByPost);
router.get("/:postId", authenticate, toggleLike);
router.get("/", getAllLikes);

module.exports = router;
