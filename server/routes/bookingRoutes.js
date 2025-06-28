const express = require("express");
const router = express.Router();

const {
  getAllBookings,
  createBooking,
  getBookingByUserId,
} = require("../controller/bookingController");

router.get("/", getAllBookings);
router.post("/", createBooking);
router.get("/:userId", getBookingByUserId);

module.exports = router;
