const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    // User details
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    user_email: { type: String, required: true },

    // Activity details
    activity_title: { type: String, required: true },
    activity_image: { type: String, required: true },
    activity_code: { type: String, required: true },

    // Selection details
    selectedDate: { type: String, required: true },
    selectedTime: { type: String, required: true },
    selectedOptionTicketTitle: { type: String, required: true },
    selectedLanguage: { type: String, required: true },
    noofadults: { type: Number, required: true },
    totalPrice: { type: Number, required: true },

    // Reservation details
    adultsData: [
      {
        DOBDay: { type: String, required: true },
        DOBMonth: { type: String, required: true },
        DOBYear: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
      },
    ],
    pickupLocation: { type: String, required: true },
    additionalrequirements: { type: String, default: "" },

    // Payment status
    paymentStatus: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", BookingSchema);
