/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - first_name
 *         - last_name
 *         - email_address
 *         - phone_number
 *       properties:
 *         first_name:
 *           type: string
 *           example: "John"
 *         last_name:
 *           type: string
 *           example: "Doe"
 *         email_address:
 *           type: string
 *           format: email
 *           example: "john.doe@example.com"
 *         phone_number:
 *           type: string
 *           example: "+919876543210"

 *     Activity:
 *       type: object
 *       required:
 *         - title
 *         - location
 *         - description
 *         - duration
 *         - code
 *         - price
 *         - image
 *         - category
 *         - review_score
 *         - time
 *         - language
 *       properties:
 *         title:
 *           type: string
 *           example: "Heritage Walk in Bangalore"
 *         location:
 *           type: string
 *           example: "Bangalore"
 *         description:
 *           type: string
 *           example: "Explore the historical landmarks of Bangalore on foot."
 *         duration:
 *           type: string
 *           example: "2 hours"
 *         code:
 *           type: string
 *           example: "ACT001"
 *         price:
 *           type: number
 *           example: 499.99
 *         image:
 *           type: array
 *           items:
 *             type: string
 *           example: ["img1.jpg", "img2.jpg"]
 *         category:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Cultural", "Walking Tour"]
 *         review_score:
 *           type: number
 *           example: 4.5
 *         time:
 *           type: array
 *           items:
 *             type: string
 *           example: ["10:00 AM", "4:00 PM"]
 *         language:
 *           type: array
 *           items:
 *             type: string
 *           example: ["English", "Kannada"]
 
 *     Error:
 *       type: object
 *       properties:
 *         status:
 *           type: integer
 *           example: 500
 *         message:
 *           type: string
 *           example: "Internal server error"
 */