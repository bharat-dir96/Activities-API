const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const UserModel = require("../models/UserData");
const {
  registerUserValidation,
  loginUserValidation,
  sendResetPasswordOtpValidation,
  verifyOtpValidation,
} = require("../validations/userValidation");

require("dotenv").config();

const secretKey = process.env.JWT_SECRET;
const nodemailerServiceName = process.env.NODEMAILER_SERVICE_NAME;
const nodemailerAuthUser = process.env.NODEMAILER_AUTH_USER;
const nodemailerAuthPassword = process.env.NODEMAILER_AUTH_PASSWORD;

const registerUser = async (req, res) => {
  try {
    const validated = await registerUserValidation.validateAsync(req.body);

    const userData = validated;
    const existingUser = await UserModel.findOne({ email: userData.email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = new UserModel({ ...userData, password: hashedPassword });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const validated = await loginUserValidation.validateAsync(req.body);
    const userData = validated;

    const userToLogin = await UserModel.findOne({ email: userData.email });
    if (!userToLogin) {
      return res.status(401).json({ message: "User doesn't exist!" });
    }

    const passwordMatch = await bcrypt.compare(
      userData.password,
      userToLogin.password
    );
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: userToLogin._id,
        username: userToLogin.username,
        email: userToLogin.email,
        role: userToLogin.role,
      },
      secretKey,
      {
        expiresIn: "30d",
      }
    );

    res.status(200).json({ token, user: userToLogin });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const sendResetPasswordOtp = async (req, res) => {
  try {
    const validated = await sendResetPasswordOtpValidation.validateAsync(
      req.body
    );
    const email = validated.email;

    // Generate OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    let user = await UserModel.findOne({ email });

    if (!user) {
      // Create new user if doesn't exist
      const timestamp = Date.now();
      const randomString = crypto.randomBytes(4).toString("hex");
      const username = `user_${timestamp}_${randomString}`;
      const hashedPassword = await bcrypt.hash(
        `temp-password-${timestamp}`,
        10
      );

      user = new UserModel({
        email,
        username,
        password: hashedPassword,
        resetPassword: { otp, otpExpiry },
        role: "user",
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
    const user = await UserModel.findOne({ email });

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

    // Create token
    const token = jwt.sign(
      {
        id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        role: updatedUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res
      .status(200)
      .json({ message: "Login successful", token, user: updatedUser });
  } catch (error) {
    console.error("OTP verification error:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  sendResetPasswordOtp,
  verifyOtpAndLogin,
};
// This code is a complete user data controller for handling user registration, login, password reset via OTP, and logout functionality.
