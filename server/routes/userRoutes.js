// File for managing all the API Endpoints
const express = require("express");
const router = express.Router();

// Getting all the functions from controller to use them with the routes.
const {
    getAllUsers,
    createUser,
    getUserById,
    updateUserById,
    deleteUserById
} = require('../controller/userController');


router.get('/', getAllUsers);
router.post('/', createUser);
router.get('/:id', getUserById);
router.patch('/:id', updateUserById);
router.delete('/:id', deleteUserById);

module.exports = router;