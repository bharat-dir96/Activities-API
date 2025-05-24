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
/**
 * @swagger
 * /api/activities:
 *   get:
 *     summary: Get all activities (optionally filter by location)
 *     tags: [Activities]
 *     parameters:
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         required: false
 *         description: Location to filter activities by (e.g., Delhi)
 *     responses:
 *       200:
 *         description: Returns a list of activities
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   location:
 *                     type: string
 *                   description:
 *                     type: string
 *                   duration:
 *                     type: string
 *                   code:
 *                     type: string
 *                   price:
 *                     type: number
 *                   image:
 *                     type: string
 *                   category:
 *                     type: string
 *                   free_cancellation:
 *                     type: boolean
 *                   review_score:
 *                     type: number
 *                   time:
 *                     type: string
 *                   language:
 *                     type: string
 *                   upcoming_date:
 *                     type: string
 *                     format: date-time
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                   __v:
 *                     type: number
 *             example:
 *               - _id: "6830cc4e0bc382f89f04f67e"
 *                 title: "Lonely Planet Experiences - Delhi Food Walk"
 *                 location: "Delhi and NCR"
 *                 description: "Delhi isn’t just the political capital of India. It’s also the culinary capital..."
 *                 duration: "6 hours - 7 hours"
 *                 code: "DEL001"
 *                 price: 3128
 *                 image: "Food_walk.jpg"
 *                 category: "Food & drink tours"
 *                 free_cancellation: true
 *                 review_score: 4.2
 *                 time: "11:00"
 *                 language: "English"
 *                 upcoming_date: "2025-05-30T19:28:14.110Z"
 *                 createdAt: "2025-05-23T19:28:14.121Z"
 *                 updatedAt: "2025-05-23T19:28:14.121Z"
 *                 __v: 0
 *               - _id: "6830cdb60bc382f89f04f682"
 *                 title: "Half Day Gandhi's Delhi"
 *                 location: "Delhi and NCR"
 *                 description: "When people think of India, there's a good chance that Gandhi is one of the first..."
 *                 duration: "6 hours"
 *                 code: "DEL002"
 *                 price: 5700
 *                 image: "Gandhi_delhi.jpg"
 *                 category: "Historical buildings & monuments"
 *                 free_cancellation: true
 *                 review_score: 4.4
 *                 time: "10:00"
 *                 language: "English"
 *                 upcoming_date: "2025-05-30T19:34:14.055Z"
 *                 createdAt: "2025-05-23T19:34:14.056Z"
 *                 updatedAt: "2025-05-23T19:34:14.056Z"
 *                 __v: 0
 *       500:
 *         description: Server error while fetching activities
 */

router.get('/', getAllActivities);

/**
 * @swagger
 * /api/activities:
 *   post:
 *     summary: Create a new activity
 *     tags: [Activities]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               location:
 *                 type: string
 *               description:
 *                 type: string
 *               duration:
 *                 type: string
 *               code:
 *                 type: string
 *               price:
 *                 type: number
 *               image:
 *                 type: string
 *               category:
 *                 type: string
 *               review_score:
 *                 type: number
 *               time:
 *                 type: string
 *             example:
 *               title: "Historical & Cultural Walking Tour in Old Delhi"
 *               location: "Delhi and NCR"
 *               description: "Discover New Delhi with this amazing walking tour, exploring the city’s vibrant markets and historic landmarks. Visit Meena Bazaar, known for its textiles and jewelry, and Khari Baoli, Asia’s largest spice market, where the air is filled with exotic aromas. Admire the grandeur of Jama Masjid, one of India’s largest mosques, and uncover the ancient charm of Agrasen ki Baoli, a stepwell showcasing the city’s architectural heritage. This tour brings together the rich history and lively atmosphere of New Delhi."
 *               duration: "7 hours"
 *               code: "DEL026"
 *               price: 4239
 *               image: "Historical_walking.jpg"
 *               category: "Walking & hiking tours"
 *               review_score: 5
 *               time: "11:00"
 *     responses:
 *       201:
 *         description: Activity created successfully
 */

router.post('/', createActivity);

/**
 * @swagger
 * /api/activities/{code}:
 *   get:
 *     summary: Get a specific activity by code
 *     tags: [Activities]
 *     parameters:
 *       - in: path
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique code of the activity
 *     responses:
 *       200:
 *         description: Activity details returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 location:
 *                   type: string
 *                 description:
 *                   type: string
 *                 duration:
 *                   type: string
 *                 code:
 *                   type: string
 *                 price:
 *                   type: number
 *                 image:
 *                   type: string
 *                 category:
 *                   type: string
 *                 free_cancellation:
 *                   type: boolean
 *                 review_score:
 *                   type: number
 *                 time:
 *                   type: string
 *                 language:
 *                   type: string
 *                 upcoming_date:
 *                   type: string
 *                   format: date-time
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                 __v:
 *                   type: number
 *             example:
 *               _id: "6830d1770bc382f89f04f68b"
 *               title: "Visit to Delhi Zoo"
 *               location: "Delhi and NCR"
 *               description: "Delhi Zoo, also known as the National Zoological Park..."
 *               duration: "9 hours"
 *               code: "DEL005"
 *               price: 7007
 *               image: "Zoo_delhi.jpg"
 *               category: "Outdoor tours"
 *               free_cancellation: true
 *               review_score: 4.2
 *               time: "10:00"
 *               language: "English"
 *               upcoming_date: "2025-05-30T19:50:15.919Z"
 *               createdAt: "2025-05-23T19:50:15.921Z"
 *               updatedAt: "2025-05-23T19:50:15.921Z"
 *               __v: 0
 *       404:
 *         description: Activity not found
 */
router.get('/:code', getActivityByCode);

/**
 * @swagger
 * /api/activities/{code}:
 *   patch:
 *     summary: Update an activity by code
 *     tags: [Activities]
 *     parameters:
 *       - in: path
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique code of the activity
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category:
 *                 type: string
 *               free_cancellation:
 *                 type: boolean
 *               review_score:
 *                 type: number
 *               time:
 *                 type: string
 *               language:
 *                 type: string
 *             example:
 *               category: "Half day tours"
 *               free_cancellation: true
 *               review_score: 4.1
 *               time: "11:00"
 *               language: "Spanish"
 *     responses:
 *       200:
 *         description: Activity updated successfully
 *       404:
 *         description: Activity not found
 */
router.patch('/:code', updateActivityByCode);

/**
 * @swagger
 * /api/activities/{code}:
 *   delete:
 *     summary: Delete an activity by code
 *     tags: [Activities]
 *     parameters:
 *       - in: path
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique code of the activity
 *     responses:
 *       200:
 *         description: Activity deleted
 *       404:
 *         description: Activity not found
 */
router.delete('/:code', deleteActivityByCode);

module.exports = router;