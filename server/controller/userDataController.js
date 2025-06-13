const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const UserModel = require("../models/User");
const {
  sendResetPasswordEmailValidation,
  verifyOtpValidation,
} = require("../validations/userValidation");

require("dotenv").config();

const nodemailerServiceName = process.env.NODEMAILER_SERVICE_NAME;
const nodemailerAuthUser = process.env.NODEMAILER_AUTH_USER;
const nodemailerAuthPassword = process.env.NODEMAILER_AUTH_PASSWORD;

const sendResetPasswordOtp = async (req, res) => {
  try {
    const validated = await sendResetPasswordEmailValidation.validateAsync(
      req.body
    );
    const email = validated.email;

    // Generate OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    let user = await UserModel.findOne({ email_address: email });

    if (!user) {
      // Create new user if doesn't exist

      // Create token
      const authToken = crypto.randomBytes(32).toString("hex");

      user = new UserModel({
        email_address: email,
        auth_token: authToken,
        resetPassword: { otp: otp, otpExpiry: otpExpiry },
      });

      await user.save();
    } else {
      // Update existing user using findByIdAndUpdate to avoid validation issues
      await UserModel.findByIdAndUpdate(user._id, {
        $set: {
          "resetPassword.otp": otp,
          "resetPassword.otpExpiry": otpExpiry,
        },
      });
    }

    // Send email
    const transporter = nodemailer.createTransport({
      service: nodemailerServiceName,
      auth: {
        user: nodemailerAuthUser,
        pass: nodemailerAuthPassword,
      },
    });

    await transporter.sendMail({
      from: nodemailerAuthUser,
      to: email,
      subject: "Your Login OTP",
      text: `Your login OTP is ${otp}. It will expire in 15 minutes.`,
    });

    res.status(200).json({ message: "OTP sent to email" });
  } catch (error) {
    console.error("OTP send error:", error);
    res.status(500).json({ error: error.message });
  }
};

const verifyOtpAndLogin = async (req, res) => {
  try {
    console.log(req.body);
    const validated = await verifyOtpValidation.validateAsync(req.body);
    const { email, otp } = validated;
    console.log(email, otp);
    const user = await UserModel.findOne({ email_address: email });
    console.log(user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (
      !user.resetPassword ||
      user.resetPassword.otp !== otp ||
      !user.resetPassword.otpExpiry ||
      new Date() > user.resetPassword.otpExpiry
    ) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Clear OTP after successful verification using findByIdAndUpdate
    const updatedUser = await UserModel.findByIdAndUpdate(
      user._id,
      { $unset: { resetPassword: 1 } },
      { new: true }
    );

    res.status(200).json({ message: "Login successful", user: updatedUser });
  } catch (error) {
    console.error("OTP verification error:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  sendResetPasswordOtp,
  verifyOtpAndLogin,
};
// This code is a complete user data controller for handling user registration, login, password reset via OTP, and logout functionality.
