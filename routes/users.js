const router = require("express").Router();
const {
  getUsers,
  getUserByUserName,
  deleteUserByUserName,
} = require("../controllers/users");

router.get("/:username", getUserByUserName);
router.delete("/:username", deleteUserByUserName);
router.get("/", getUsers);

module.exports = router;
