const express = require("express");
const router = express.Router();

const {
  sendResetPasswordOtp,
  verifyOtpAndLogin,
} = require("../controller/userDataController");

router.post("/send/otp", sendResetPasswordOtp);
router.post("/verify/otp", verifyOtpAndLogin);

module.exports = router;
