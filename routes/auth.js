const router = require("express").Router();
const { createUser, login, verifyToken } = require("../controllers/auth");
const authenticate = require("../middlewares/authenticate");

router.post("/register", createUser);
router.post("/login", login);
router.get("/verify-token", authenticate, verifyToken);

module.exports = router;
