const crypto = require("crypto");
const User = require(`../models/User`);

exports.getAllUsers = async (req, res) => {
  try {
    const allusers = await User.find();
    return res.json(allusers);
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch users" });
  }
};

exports.createUser = async (req, res) => {
  try {
    // Generate a secure random token
    const authToken = crypto.randomBytes(32).toString("hex");

    // Attach token to the request body
    req.body.auth_token = authToken;

    // Create new user
    const newUser = await User.create(req.body);

    return res.status(201).json({
      status: "Success",
      result: 1,
      data: newUser,
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.getUserByAuthToken = async (req, res) => {
  try {
    const user = await User.findOne({ auth_token: req.params.auth_token });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.json(user);
  } catch (err) {
    return res.status(400).json({ error: "Invalid User Id" });
  }
};

exports.updateUserByAuthToken = async (req, res) => {
  try {
    const updated = await User.findOneAndUpdate(
      { auth_token: req.params.auth_token },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updated) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ status: "success", updated: updated });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.deleteUserByAuthToken = async (req, res) => {
  try {
    const deleted = await User.findOneAndDelete({
      auth_token: req.params.auth_token,
    });

    if (!deleted) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json({ status: "success", deletedUser: deleted });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
