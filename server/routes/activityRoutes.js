// File for managing all the API Endpoints
const express = require("express");
const router = express.Router();

// Getting all the functions from controller to use them with the routes.
const {
    getAllActivities,
    createActivity,
    getActivityByCode,
    updateActivityByCode,
    deleteActivityByCode
} = require('../controller/activityController');

// API Endpoints
router.get('/', getAllActivities);
router.post('/', createActivity);
router.get('/:code', getActivityByCode);
router.patch('/:code', updateActivityByCode);
router.delete('/:code', deleteActivityByCode);

module.exports = router;