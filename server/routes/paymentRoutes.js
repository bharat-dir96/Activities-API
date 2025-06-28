const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../models/Orders");
const Booking = require("../models/Bookings");

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Step 1: Create Razorpay Order
router.post("/create-order", async (req, res) => {
  const { amount, currency, userId, userEmail, bookingId } = req.body;
  console.log("body", req.body);

  options = {
    amount: amount * 100,
    currency: currency,
    receipt: `rcpt_${Date.now()}`,
  };

  try {
    const order = await razorpay.orders.create(options);

    await Order.create({
      userId: userId,
      userEmail: userEmail,
      bookingId: bookingId,
      razorpayOrderId: order.id,
      amount: amount,
      currency: currency,
      status: "CREATED",
    });

    res.json(order);
  } catch (error) {
    console.error("Error creating Razorpay order", error);
    res.status(500).send("Unable to create order");
  }
});

// Step 2: Verify Payment Signature
router.post("/verify-payment", async (req, res) => {
  const {
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
    bookingId,
  } = req.body;

  const generated_signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  const isValid = generated_signature === razorpay_signature;

  if (isValid) {
    // ✅ Save payment info in Orders collection
    await Order.findOneAndUpdate(
      { razorpayOrderId: razorpay_order_id },
      {
        status: "PAID",
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
      }
    );

    // ✅ Update paymentStatus in Bookings collection
    await Booking.findOneAndUpdate({ _id: bookingId }, { paymentStatus: true });

    return res.json({ success: true });
  } else {
    return res
      .status(400)
      .json({ success: false, message: "Invalid signature" });
  }
});

module.exports = router;
