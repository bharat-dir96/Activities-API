const express = require("express");
const router = express.Router();

const {
  getAllActivities,
  createActivity,
  getActivityByCode,
  updateActivityByCode,
  deleteActivityByCode,
} = require("../controller/activityController");

router.get("/", getAllActivities);
router.post("/", createActivity);
router.get("/:code", getActivityByCode);
router.patch("/:code", updateActivityByCode);
router.delete("/:code", deleteActivityByCode);

module.exports = router;
