// File for defining the schemas for database collections
const mongoose = require('mongoose');

// Schema for the package data
const activitySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true,
            minlength: [10, 'Title must be at least 10 characters long']
        },
        location: {
            type: String,
            required: [true, 'Location is required'],
            trim: true,
            minlength: [3, 'Location must be at least 3 characters long']
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
            trim: true,
            minlength: [50, 'Description must be at least 50 characters long']
        },
        duration: {
            type: String,
            required: [true, 'Duration is required'],
            trim: true,
            minlength: [3, 'Duration must be descriptive (e.g., "1 Day", "15 Hours")']
        },
        upcoming_date: {
            type: Date,
            required: [true, 'Upcoming date is required'],
            default: () => {
                const date = new Date();
                date.setDate(date.getDate() + 7);
                return date;
            },
            validate: {
                // Ensures provided date is in future.
                validator: function(value) {
                    return value >= new Date();
                },
                message: "Upcoming date must be today or in the future."
            }
        },
        code: {
            type: String,
            required: [true, 'Package code is required'],
            unique: true,
            trim: true,
            index: true,
            minlength: [5, 'Description must be at least 5 characters long']
        },
        price: {
            type: Number,
            required: [true, 'Price is required'],
            validate: {
                validator: function (v) {
                    // Extract numeric part and ensure it's greater than 0
                    const numericValue = parseFloat(v.toString().replace(/[^0-9.]/g, ''));
                    return !isNaN(numericValue) && numericValue > 0;
                },
                message: props => `${props.value} is not a valid price. Must be greater than 0.`
            }
        },
        image: {
            type: [String],
            required: [true, 'At least one image path is required'],
            validate: {
                validator: function (arr) {
                    return Array.isArray(arr) && arr.length > 0 && arr.every(img => typeof img === 'string');
                },
                message: 'Image must be a non-empty array of strings'
            }
        },
        category: {
            type: String,
            required: [true, 'category is required'],
            trim: true,
            minlength: [10, 'Category must be at least 10 characters long']
        },
        free_cancellation: {
            type: Boolean,
            default: true,
        },
        review_score: {
            type: Number,
            min: 0,
            max: 5,
            required: [true, 'review score is required'],
        },
        time: {
            type: String,
            trim: true,
            validate: {
                validator: function (v) {
                    return /^([01]\d|2[0-3]):?([0-5]\d)$/.test(v);  // Matches "HH:mm"
                },
                message: props => `${props.value} is not a valid time format (HH:mm)`
            },
            required: [true, 'time is required'],
        },
        language: {
            type: String,
            trim: true,
            required: [true, 'language is required'],
            default: "English",
            minlength: [5, 'Language must be at least 5 characters long'],
        }
    }, {timestamps: true}
);

// Model for Collection named "Packages" using the packageSchema
module.exports = mongoose.model("Activities", activitySchema);