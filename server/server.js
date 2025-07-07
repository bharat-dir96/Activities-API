const express = require("express");
const connectDB = require("./config/db");
const activityRoutes = require("./routes/activityRoutes");
const userRoutes = require("./routes/userRoutes");
const userDataRoutes = require("./routes/userDataRoutes");
const authRoutes = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const cors = require("cors");
const dotenv = require("dotenv");
const { swaggerUi, specs } = require("./swagger");
const passport = require("passport");
const session = require("express-session");

dotenv.config();

require("./config/passportConfig")(passport);

const app = express();
const Port = process.env.Port || 3000;
const apiKeyAuth = require("./middleware/apikeyAuth");

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect to DB
connectDB();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Frontend Routes
app.get("/", (req, res) => {
  const html = `
        <br>
        <div style="text-align:center; font-size:25px;">
            <h1>API Endpoints: </h1>
            <ul style="list-style-type: none;">
                <li><strong>GET</strong> /api/activities</li>
                <li><strong>POST</strong> /api/activities</li>
                <li><strong>GET</strong> /api/activities/:code</li>
                <li><strong>PATCH</strong> /api/activities/:code</li>
                <li><strong>DELETE</strong> /api/activities/:code</li>
            </ul>
        </div>
    `;
  return res.send(html);
});

// This allows react app to run on different port to fetch API data without CORS Error.
app.use(cors());

// Middleware for parsing the body which is urlencoded and save it in req object.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/", apiKeyAuth); // Apply API key authentication middleware to all API routes

// API Routes
app.use("/api/activities", activityRoutes);
app.use("/api/users", userRoutes);
app.use("/api/email", userDataRoutes); // Gmail login routes
app.use("/auth", authRoutes); // Google auth routes
app.use("/api/bookings", bookingRoutes);
app.use("/api/payments", paymentRoutes);

app.listen(Port, () => console.log("Server Started at Port:", Port));
