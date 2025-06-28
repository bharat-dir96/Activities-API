const Activity = require("../models/Activity");

exports.getAllActivities = async (req, res) => {
  try {
    const query = {};
    if (req.query.location) {
      query.location = req.query.location;
    }
    const allactivities = await Activity.find(query);
    return res.status(200).json(allactivities);
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Server error: Failed to fetch activities" });
  }
};

exports.createActivity = async (req, res) => {
  try {
    const data = req.body;

    // Check if data is an array
    if (Array.isArray(data)) {
      const newActivities = await Activity.insertMany(data);
      return res.status(201).json({
        status: "Success",
        result: newActivities.length,
        data: newActivities,
      });
    }

    // If it's a single object
    const newActivity = await Activity.create(data);
    return res.status(201).json({
      status: "Success",
      result: 1,
      data: newActivity,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message });
    }
    return res
      .status(500)
      .json({ error: "Server error: Failed to create activity" });
  }
};

exports.getActivityByCode = async (req, res) => {
  try {
    const activity = await Activity.findOne({ code: req.params.code });
    if (!activity) {
      return res.status(404).json({ error: "Activity not found" });
    }
    return res.status(200).json(activity);
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Server error: Failed to fetch activity" });
  }
};

exports.updateActivityByCode = async (req, res) => {
  try {
    const updated = await Activity.findOneAndUpdate(
      { code: req.params.code },
      { $set: req.body },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Package not found" });
    }

    return res.status(200).json({ status: "success", updated: updated });
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message });
    }
    return res
      .status(500)
      .json({ error: "Server error: Failed to update activity" });
  }
};

exports.deleteActivityByCode = async (req, res) => {
  try {
    const deleted = await Activity.findOneAndDelete({ code: req.params.code });

    if (!deleted) {
      return res.status(404).json({ error: "Package not found" });
    }

    return res.status(200).json({ status: "success", deletedUser: deleted });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Server error: Failed to delete activity" });
  }
};
