// File for defining the schemas for database collections
const mongoose = require("mongoose");

// Schema for the user data
const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      default: null,
    },
    last_name: {
      type: String,
      default: null,
    },
    email_address: {
      type: String,
      required: [true, "Email Address is required"],
      unique: true,
      trim: true,
      minlength: [5, "Email Address must be at least 5 characters long"],
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Please provide a valid email address"],
    },
    phone_number: {
      type: String,
      default: null,
      sparse: true,
    },
    auth_token: {
      type: String,
      default: null,
    },
    googleId: {
      type: String,
      default: null,
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
  },
  { timestamps: true }
);

// Model for Collection named "Packages" using the packageSchema
module.exports = mongoose.model("Users", userSchema);
