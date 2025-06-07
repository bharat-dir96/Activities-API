// File for managing all the API Endpoints
const express = require("express");
const router = express.Router();

// Getting all the functions from controller to use them with the routes.
const {
    getAllUsers,
    createUser,
    getUserByAuthToken,
    updateUserByAuthToken,
    deleteUserByAuthToken
} = require('../controller/userController');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and operations
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Returns a list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Server error while fetching users
 */
router.get('/', getAllUsers);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *           example:
 *             first_name: "John"
 *             last_name: "Doe"
 *             email_address: "john.doe@example.com"
 *             phone_number: "+919876543210"
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Validation error or bad request
 */
router.post('/', createUser);

/**
 * @swagger
 * /api/users/{auth_token}:
 *   get:
 *     summary: Get a user by auth token
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: auth_token
 *         schema:
 *           type: string
 *         required: true
 *         description: The unique auth_token of the user
 *     responses:
 *       200:
 *         description: Returns the user details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
router.get('/:auth_token', getUserByAuthToken);

/**
 * @swagger
 * /api/users/{auth_token}:
 *   patch:
 *     summary: Update a user by auth token
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: auth_token
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique auth_token of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email_address:
 *                 type: string
 *               phone_number:
 *                 type: string
 *           example:
 *             first_name: "Updated"
 *             email_address: "updated@example.com"
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 */
router.patch('/:auth_token', updateUserByAuthToken);

/**
 * @swagger
 * /api/users/{auth_token}:
 *   delete:
 *     summary: Delete a user by auth token
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: auth_token
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique auth token of the user to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete('/:auth_token', deleteUserByAuthToken);

module.exports = router;