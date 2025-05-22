const express = require("express");
const connectDB = require('./config/db');
const activityRoutes = require('./routes/activityRoutes');
const cors =  require("cors");
const path =  require("path");
const dotenv = require("dotenv");

dotenv.config();


const app = express();
const Port = process.env.Port || 3000;

// Connect to DB
connectDB();

// This allows react app to run on different port to fetch API data without CORS Error.
app.use(cors());

// Middleware for parsing the body which is urlencoded and save it in req object.
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));


// API Routes
app.use('/api/activities', activityRoutes);

// Frontend Routes
//For any frontend route not handled by API, return React's index.html


// Serve everything inside the dist folder at the root URL (/).
// GET / → serves index.html
app.use(express.static(path.join(__dirname, '../client/dist')));

// GET /packages → serves index.html
app.get("/packages", (req,res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(Port,() => console.log("Server Started at Port:", Port));