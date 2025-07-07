// routes/auth.routes.js
const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();
const UserModel = require("../models/User");

// Google OAuth redirect
router.get(
  "/google",
  (req, res, next) => {
    const apiKey = req.query.apikey; // Access apikey from query params
    if (!apiKey || apiKey !== process.env.API_KEY) {
      return res.status(401).json({ error: "Invalid or missing API key" });
    }
    next();
  },
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

// Handle Google OAuth callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${
      process.env.CLIENT_URL || "http://localhost:5173"
    }/email`,
  }),
  (req, res) => {
    try {
      const user = req.user;

      if (!user || !user.auth_token) {
        throw new Error("User not found or missing auth_token");
      }

      console.log("user Data:", user);

      // Redirect with token
      res.redirect(
        `${
          process.env.CLIENT_URL || "http://localhost:5173"
        }/login-success?token=${user.auth_token}`
      );
    } catch (error) {
      console.error("OAuth callback error:", error);
      res.redirect(
        `${process.env.CLIENT_URL || "http://localhost:5173"}/email`
      );
    }
  }
);

module.exports = router;
