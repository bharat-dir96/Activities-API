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
        departure: {
            type: String,
            required: true,
            trim: true,
            minlength: [3, 'Departure must be descriptive (e.g., "Every Sunday")']
        },
        upcoming_date: {
            type: Date,
            required: [true, 'Upcoming date is required'],
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
        image:{
            type: String,
            required: [true, 'Image path is required'],
            trim: true,
        }
    }, {timestamps: true}
);

// Model for Collection named "Packages" using the packageSchema
module.exports = mongoose.model("Activities", activitySchema);