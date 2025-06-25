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
 *             example:
 *               status: 500
 *               message: Internal server error
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
 *     responses:
 *       201:
 *         description: Activity created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Activity'
 *       400:
 *         description: Bad request — validation or body structure failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               status: 400
 *               message: Invalid request body or missing required fields

 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               status: 500
 *               message: Internal server error
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
 *             example:
 *               status: 404
 *               message: Activity not found
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               status: 500
 *               message: Internal server error
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
 *              $ref: '#/components/schemas/Activity'
 *           example:
 *              duration: "5 Hours"
 *              price: 1000
 *              image: ["https://raw.githubusercontent.com/HCPTravels/API-Images/main/Images/Jaipur/JAIP001/JAIP001-01.jpg", "https://raw.githubusercontent.com/HCPTravels/API-Images/main/Images/Jaipur/JAIP001/JAIP001-02.jpg", "https://raw.githubusercontent.com/HCPTravels/API-Images/main/Images/Jaipur/JAIP001/JAIP001-03.jpg"]
 *              time: ["09:00", "10:30", "12:00", "14:00", "15:00"]
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
 *             example:
 *               status: 404
 *               message: Activity not found
 *       400:
 *         description: Bad request — validation or body structure failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               status: 400
 *               message: Invalid request body or missing required fields
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               status: 500
 *               message: Internal server error
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
 *             example:
 *               status: 404
 *               message: Activity not found
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               status: 500
 *               message: Internal server error
 */
