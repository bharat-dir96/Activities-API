/**
 * @swagger
 * tags:
 *   name: Activities
 *   description: Activities management and operations
 */

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
 *         description: Location to filter activities by
 *     responses:
 *       200:
 *         description: List of activities
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Activity'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

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
 *             $ref: '#/components/schemas/Activity'
 *           example:
 *             title: "City Tour"
 *             location: "Bangalore"
 *             description: "A comprehensive city tour."
 *             duration: "3 hours"
 *             code: "CTB001"
 *             price: 1500
 *             image: ["url1.jpg", "url2.jpg"]
 *             category: ["Tour", "Sightseeing"]
 *             review_score: 4.5
 *             time: ["9:00 AM", "2:00 PM"]
 *             language: ["English", "Hindi"]
 *     responses:
 *       201:
 *         description: Activity created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Activity'
 */

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
 *         description: Activity code
 *     responses:
 *       200:
 *         description: Activity data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Activity'
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /api/activities/{code}:
 *   patch:
 *     summary: Update an activity by code
 *     tags: [Activities]
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category:
 *                 type: array
 *                 items:
 *                   type: string
 *               free_cancellation:
 *                 type: boolean
 *               review_score:
 *                 type: number
 *               time:
 *                 type: array
 *                 items:
 *                   type: string
 *               language:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Activity'
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /api/activities/{code}:
 *   delete:
 *     summary: Delete an activity by code
 *     tags: [Activities]
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Activity deleted successfully
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */