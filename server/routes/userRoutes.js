const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  createUser,
  getUserByAuthToken,
  updateUserByAuthToken,
  deleteUserByAuthToken,
} = require("../controller/userController");

router.get("/", getAllUsers);
router.post("/", createUser);
router.get("/:auth_token", getUserByAuthToken);
router.patch("/:auth_token", updateUserByAuthToken);
router.delete("/:auth_token", deleteUserByAuthToken);

module.exports = router;
