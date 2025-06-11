const mongoose = require("mongoose");

const UserDataSchema = new mongoose.Schema({
  googleId: {
    type: String,
    default: null,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["admin", "user"], // Allow only admin and user roles
    default: "user",
  },
  resetPassword: {
    otp: {
      type: String,
      required: false,
    },
    otpExpiry: {
      type: Date,
      required: false,
    },
  },
});

module.exports = mongoose.model("UserData", UserDataSchema);
