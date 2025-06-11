// File for defining the schemas for database collections
const mongoose = require("mongoose");

// Schema for the user data
const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "First Name is required"],
      trim: true,
      minlength: [2, "First Name must be at least 2 characters long"],
    },
    last_name: {
      type: String,
      required: [true, "Last Name is required"],
      trim: true,
      minlength: [2, "Last Name must be at least 2 characters long"],
    },
    email_address: {
      type: String,
      required: [true, "Email Address is required"],
      unique: true,
      trim: true,
      minlength: [10, "Email Address must be at least 10 characters long"],
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Please provide a valid email address"],
    },
    phone_number: {
      type: String,
      required: [true, "Phone Number is required"],
      unique: true,
      validate: {
        validator: function (v) {
          // Match phone number in format: +<country-code><10-digit number>
          // e.g., +919876543210 (India)
          return /^\+\d{1,4}\d{10}$/.test(v);
        },
        message: (props) =>
          `${props.value} is not a valid phone number. It should include country code and 10-digit number (e.g. +919876543210).`,
      },
    },
    auth_token: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

// Model for Collection named "Packages" using the packageSchema
module.exports = mongoose.model("Users", userSchema);
