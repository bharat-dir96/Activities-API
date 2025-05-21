// File for defining the schemas for database collections
const mongoose = require('mongoose');

// Schema for the package data
const packageSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        origin: {
            type: String,
            required: true,
        },
        destination: {
            type: String,
            required: true,
        },
        duration: {
            type: String,
            required: true,
        },
        departure: {
            type: String,
            required: true,
        },
        upcoming_date: {
            type: String,
            required: true,
        },
        code: {
            type: String,
            required: true,
            unique: true,
        },
        price: {
            type: String,
            required: true,
        }
    }, {timestamps: true}
);

// Model for Collection named "Packages" using the packageSchema
module.exports = mongoose.model("Package", packageSchema);