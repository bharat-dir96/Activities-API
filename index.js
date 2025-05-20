const express = require("express");
const mongoose = require("mongoose");

const app = express();
const Port = 3000;

// Database for Activities API
mongoose
    .connect('mongodb://127.0.0.1:27017/Activities-DB')
    .then(() => console.log("MongoDB Database Connected"))
    .catch((err) => console.log("MongoDB Error:", err));

// Schema for the package data
const packageSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        origin: {
            type: String,
            required: true,
        },
        destination: {
            type: String,
            required: true,
        },
        duration: {
            type: String,
            required: true,
        },
        departure: {
            type: String,
            required: true,
        },
        upcoming_date: {
            type: String,
            required: true,
        },
        code: {
            type: String,
            required: true,
            unique: true,
        },
        price: {
            type: String,
            required: true,
        }
    }, {timestamps: true}
);

// Model for Collection named "Packages" using the packageSchema
const Package = mongoose.model("Packages",packageSchema);

// Middleware for parsing the body which is urlencoded and save it in req object.
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));

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

// API Routes
app
    .route('/api')
    .get((req,res) => {
        const html = `
        <h2>API Endpoints:</h2>
        <ul>
            <li>GET &emsp;&emsp;/api</li>
            <li>GET &emsp;&emsp;/api/packages</li>
            <li>POST &emsp;&emsp;/api/packages</li>
            <li>GET &emsp;&emsp;/api/packages/:code</li>
            <li>PATCH &emsp;&emsp;/api/packages/:code</li>
            <li>DELETE &emsp;/api/packages/:code</li>
        </ul>
        `
        return res.send(html);
    })

app
    .route('/api/packages')
    .get(async (req,res) => {
        const allpackages = await Package.find();
        return res.json(allpackages);
    })
    .post(async (req,res) =>{
        const body = req.body;

        try{
            const result = await Package.create(body);
            return res.status(201).json({status: "Success", result: result});
        } catch(err) {
            return res.status(400).json({ error: err.message})
        }
    })


app
    .route('/api/package/:code')
    .get(async (req,res) => {
        const package = await Package.findOne({code: req.params.code});
        if(!package){
            return res.status(404).json({error: "Package not found"});
        }
        return res.json(package);
    })
    .patch(async (req,res) =>{
        const body = req.body;

        const updated = await Package.findOneAndUpdate({code: req.params.code}, { $set: body}, {new: true});

        if(!updated){
            return res.status(404).json({error: "Package not found"});
        }

        return res.status(201).json({status: "success", updated: updated});
    })
    .delete(async (req,res) =>{
        const deleted = await Package.findOneAndDelete({code: req.params.code});

        if(!deleted){
            return res.status(404).json({error: "Package not found"});
        }

        return res.json({status: "success", deletedUser: deleted});
    })


app.listen(Port,() => console.log("Server Started at Port:", Port));