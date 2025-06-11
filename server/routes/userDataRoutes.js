const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  sendResetPasswordOtp,
  verifyOtpAndLogin,
} = require("../controller/userDataController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/send/otp", sendResetPasswordOtp);
router.post("/verify/otp", verifyOtpAndLogin);

module.exports = router;
