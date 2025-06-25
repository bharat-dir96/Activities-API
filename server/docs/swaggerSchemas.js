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
 *         - review_score
 *         - free_cancellation
 *         - group_discount
 *         - included
 *         - not_included
 *         - additional_info
 *         - category
 *         - time
 *         - language
 *       properties:
 *         title:
 *           type: string
 *           example: "Heritage Walk in Jaipur"
 *         location:
 *           type: string
 *           example: "Jaipur"
 *         description:
 *           type: string
 *           example: "Explore the rich history of Jaipur in this guided heritage walk..."
 *         duration:
 *           type: string
 *           example: "4 Hours"
 *         code:
 *           type: string
 *           example: "JAIP001"
 *         price:
 *           type: number
 *           example: 1200
 *         image:
 *           type: array
 *           items:
 *             type: string
 *           example: ["https://raw.githubusercontent.com/HCPTravels/API-Images/main/Images/Jaipur/JAIP001/JAIP001-01.jpg", "https://raw.githubusercontent.com/HCPTravels/API-Images/main/Images/Jaipur/JAIP001/JAIP001-02.jpg"]
 *         review_score:
 *           type: number
 *           example: 4.7
 *         free_cancellation:
 *           type: boolean
 *           example: true
 *         group_discount:
 *           type: boolean
 *           example: false
 *         included:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Food Service/ Breakfast Meal", "Toilets & Helpdesk", "Wifi"]
 *         not_included:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Tips and gratuities", "Drinks at buffet"]
 *         additional_info:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Wheelchair accessible", "Public transportation nearby", "Valid ID required"]
 *         category:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Food & drink tours", "Half day tours", "Walking & hiking tours"]
 *         time:
 *           type: array
 *           items:
 *             type: string
 *           example: ["09:00", "10:30", "12:00", "14:00"]
 *         language:
 *           type: array
 *           items:
 *             type: string
 *           example: ["English", "Hindi"]
 *
 
 *     Error:
 *       type: object
 *       properties:
 *         status:
 *           type: integer
 *           example: 400
 *         message:
 *           type: string
 *           example: "Activity not found"
 */
