const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getUserByAuthToken,
  updateUserByAuthToken,
  deleteUserByAuthToken,
} = require("../controller/userController");

router.get("/", getAllUsers);
router.get("/:auth_token", getUserByAuthToken);
router.patch("/:auth_token", updateUserByAuthToken);
router.delete("/:auth_token", deleteUserByAuthToken);

module.exports = router;
