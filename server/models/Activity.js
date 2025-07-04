// File for defining the schemas for database collections
const mongoose = require("mongoose");

// Schema for the activity data
const activitySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [10, "Title must be at least 10 characters long"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
      minlength: [3, "Location must be at least 3 characters long"],
    },
    short_description: {
      type: String,
      required: [true, "Short description is required"],
      trim: true,
      minlength: [20, "Short description must be at least 20 characters long"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      minlength: [500, "Description must be at least 500 characters long"],
    },
    duration: {
      type: String,
      required: [true, "Duration is required"],
      trim: true,
      minlength: [
        3,
        'Duration must be descriptive (e.g., "1 Day", "15 Hours")',
      ],
    },
    code: {
      type: String,
      required: [true, "Package code is required"],
      unique: true,
      trim: true,
      index: true,
      minlength: [5, "Description must be at least 5 characters long"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      validate: {
        validator: function (v) {
          // Extract numeric part and ensure it's greater than 0
          const numericValue = parseFloat(v.toString().replace(/[^0-9.]/g, ""));
          return !isNaN(numericValue) && numericValue >= 0;
        },
        message: (props) =>
          `${props.value} is not a valid price. Must be greater than 0.`,
      },
    },
    image: {
      type: [String],
      required: [true, "At least one image path is required"],
      validate: {
        validator: function (arr) {
          return (
            Array.isArray(arr) &&
            arr.length > 0 &&
            arr.every((img) => typeof img === "string")
          );
        },
        message: "Image must be a non-empty array of strings",
      },
    },
    review_score: {
      type: Number,
      min: 0,
      max: 5,
      required: [true, "review score is required"],
    },
    free_cancellation: {
      type: Boolean,
      required: true,
    },
    group_discount: {
      type: Boolean,
      required: true,
    },
    included: {
      type: [String],
      required: [true, "At Least one service is required."],
    },
    not_included: {
      type: [String],
    },
    additional_info: {
      type: [String],
      required: [true, "At Least one additional info is required."],
    },
    category: {
      type: [String],
      required: [true, "At least one category is required"],
      validate: {
        validator: function (arr) {
          return (
            Array.isArray(arr) &&
            arr.length > 0 &&
            arr.every(
              (val) => typeof val === "string" && val.trim().length >= 10
            )
          );
        },
        message:
          "Each category must be a trimmed string of at least 10 characters",
      },
    },
    time: {
      type: [String],
      required: [true, "At least one time value is required"],
      validate: {
        validator: function (arr) {
          return (
            Array.isArray(arr) &&
            arr.length > 0 &&
            arr.every(
              (val) =>
                /^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/i.test(val.trim()) // Matches "HH:mm"
            )
          );
        },
        message: "Each time must be in a valid time format (HH:mm)",
      },
    },
    language: {
      type: [String],
      required: [true, "At least one language is required"],
      validate: {
        validator: function (arr) {
          return (
            Array.isArray(arr) &&
            arr.length > 0 &&
            arr.every(
              (val) => typeof val === "string" && val.trim().length >= 5
            )
          );
        },
        message:
          "Each language must be a trimmed string of at least 5 characters",
      },
    },
  },
  { timestamps: true }
);

// Model for Collection named "Packages" using the packageSchema
module.exports = mongoose.model("Activities", activitySchema);
