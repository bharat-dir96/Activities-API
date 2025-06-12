// config/passport.config.js
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const UserModel = require("../models/UserData");

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL:
          "https://activities-api-w8vb.onrender.com/auth/google/callback",
        scope: ["profile", "email"],
        passReqToCallback: true,
      },
      async (req, accessToken, refreshToken, profile, done) => {
        try {
          // Extract email and name from profile
          const email = profile.emails[0].value;
          const username = profile.displayName || `user-${Date.now()}`;

          // Check if user exists
          let user = await UserModel.findOne({ email });

          if (user) {
            // Update existing user with Google ID
            user.googleId = profile.id;
            await user.save();
            return done(null, user);
          }

          // Create new user
          const newUser = new UserModel({
            email,
            username,
            // username: profile.displayName,
            googleId: profile.id,
            password: "google-auth", // Dummy password
            role: "user",
            verified: true,
          });

          await newUser.save();
          return done(null, newUser);
        } catch (error) {
          return done(error, null);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await UserModel.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });
};
