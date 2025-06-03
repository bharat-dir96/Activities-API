const express = require("express");
const connectDB = require('./config/db');
const activityRoutes = require('./routes/activityRoutes');
const userRoutes = require('./routes/userRoutes')
const cors =  require("cors");
const path =  require("path");
const dotenv = require("dotenv");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

dotenv.config();

const app = express();
const Port = process.env.Port || 3000;

// Connect to DB
connectDB();

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'HCP Travels API',
            version: '1.0.0',
        },
    },
    apis: ['./routes/activityRoutes.js'], // or wherever your route files are
};

// API Documentation Route
const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Frontend Routes
app.get('/',(req,res) => {
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
})


// This allows react app to run on different port to fetch API data without CORS Error.
app.use(cors());

// Middleware for parsing the body which is urlencoded and save it in req object.
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));


// API Routes
app.use('/api/activities', activityRoutes);
app.use('/api/users', userRoutes);


app.listen(Port,() => console.log("Server Started at Port:", Port));