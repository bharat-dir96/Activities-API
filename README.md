# 🧳 HCP Travels Activities-API

A RESTful API for managing travel activity packages, built with **Node.js**, **Express**, and **MongoDB**, and documented using **Swagger UI**.

---

## 🚀 Features

- Create, retrieve, update, and delete travel activities
- Filter activities by location (using query) or code (using path)
- API documentation with Swagger UI
- Simple HTML homepage displaying all available endpoints
- CORS support for frontend integration

---

## 📂 Project Structure
.
├── server
    ├── config/ # Database Connection (db.js)
    ├── controller/ # Controller logic for APIs (activityController.js)
    ├── models/ # Mongoose schema (Activity.js)
    ├── routes/ # Express route handlers (activityRoutes.js)
    ├── server.js # Entry point
    ├── .env # Environment variables


---

## 🔧 Setup Instructions

1. **Clone the repository and move to the project directory**
   ```bash
   git clone https://github.com/HCPTravels/Activities-API.git
   cd Activities-API
   
2. **Install dependencies**
   ```bash
   npm install

3. **Create a .env file in the root directory**
   Define the values for your MongoDB URI and PORT Number
   
   MONGO_URI=<your_mongodb_connection_string>
   Port=3000

4. **Move to the server folder, and start the server**
   ```bash
   cd server
   npm start
   
🌐 API Base URL
👉 http://localhost:3000


📘 API Documentation
Swagger UI is available at:

👉 http://localhost:3000/api-docs

You can try, test, and inspect API endpoints directly from the browser.


📄 API Endpoints
| Method | Endpoint                  | Description                                                   |
|--------|---------------------------|--------------------------------------                         |
| GET    | `/api/activities`         | Get all activities(optionally by ?location=)                  |
| POST   | `/api/activities`         | Create a new activity                                         |  
| GET    | `/api/activities/:code`   | Get an activity by code                                       |
| PATCH  | `/api/activities/:code`   | Update an activity by code                                    |
| DELETE | `/api/activities/:code`   | Delete an activity by code                                    |



🏠 Homepage
Visiting the root URL (/) returns a simple HTML page displaying all available API endpoints.
