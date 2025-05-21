// File for managing all the API Endpoints
const express = require("express");
const router = express.Router();

// Getting all the functions from controller to use them with the routes.
const {
    getAllPackages,
    createPackage,
    getPackageByCode,
    updatePackageByCode,
    deletePackageByCode
} = require('../controller/packageController');

// API Endpoints
router.get('/', getAllPackages);
router.post('/', createPackage);
router.get('/:code', getPackageByCode);
router.patch('/:code', updatePackageByCode);
router.delete('/:code', deletePackageByCode);

module.exports = router;