const Booking = require("../models/Bookings");

exports.getAllBookings = async (req, res) => {
  try {
    const allBookings = await Booking.find();
    return res.json(allBookings);
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch bookings" });
  }
};

exports.createBooking = async (req, res) => {
  try {
    const data = req.body;

    const newBooking = await Booking.create(data);

    return res.status(201).json({ status: "Success", data: newBooking });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.getBookingByUserId = async (req, res) => {
  const userId = req.params.userId;

  try {
    const bookings = await Booking.find({
      user_id: userId,
      paymentStatus: true,
    });
    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ error: "No bookings found for this user" });
    }
    return res.status(200).json(bookings);
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch bookings" });
  }
};
