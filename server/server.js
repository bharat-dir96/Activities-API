const express = require("express");
const connectDB = require('./config/db');
const packageRoutes = require('./routes/packageRoutes');
const Package = require('./models/Package');


const app = express();
const Port = 3000;

// Connect to DB
connectDB();


// Middleware for parsing the body which is urlencoded and save it in req object.
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));


// API Routes
app.use('/api/packages', packageRoutes);

// Frontend Routes
app.get('/', (req,res) => {
    res.send("Hello World");
});

app.get('/packages', async (req,res) => {
    const allpackages = await Package.find();
    const html = `
    <ul>
        ${allpackages.map(package => `<li>${package.title} - ${package.destination}</li>`).join("")}
    </ul>
    `;
    res.send(html);
})

app.listen(Port,() => console.log("Server Started at Port:", Port));