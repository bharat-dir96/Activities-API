const Package = require('../models/Package');

exports.getAllPackages = async (req,res) => {
        const allpackages = await Package.find();
        return res.json(allpackages);
    };

exports.createPackage = async (req,res) =>{
        try{
            const newpackage = await Package.create(req.body);
            return res.status(201).json({status: "Success", result: newpackage});
        } catch(err) {
            return res.status(400).json({ error: err.message})
        }
    };

exports.getPackageByCode = async (req,res) => {
        const package = await Package.findOne({code: req.params.code});
        if(!package){
            return res.status(404).json({error: "Package not found"});
        }
        return res.json(package);
    };

exports.updatePackageByCode = async (req,res) =>{
        const updated = await Package.findOneAndUpdate({code: req.params.code}, { $set: req.body}, {new: true});

        if(!updated){
            return res.status(404).json({error: "Package not found"});
        }

        return res.status(201).json({status: "success", updated: updated});
    };

exports.deletePackageByCode = async (req,res) =>{
        const deleted = await Package.findOneAndDelete({code: req.params.code});

        if(!deleted){
            return res.status(404).json({error: "Package not found"});
        }

        return res.json({status: "success", deletedUser: deleted});
    };