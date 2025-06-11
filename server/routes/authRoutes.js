// routes/auth.routes.js
const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Google OAuth redirect
router.get(
  "/google",
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
    }/login?error=oauth_failed`,
  }),
  (req, res) => {
    try {
      const user = req.user;

      // Generate JWT
      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
          username: user.username,
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      // Redirect with token
      res.redirect(
        `${
          process.env.CLIENT_URL || "http://localhost:5173"
        }/login-success?token=${token}`
      );
    } catch (error) {
      console.error("OAuth callback error:", error);
      res.redirect(
        `${
          process.env.CLIENT_URL || "http://localhost:5173"
        }/login?error=server_error`
      );
    }
  }
);

module.exports = router;
