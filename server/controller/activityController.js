const Activity = require('../models/Activity');

exports.getAllActivities = async (req,res) => {
        const allactivities = await Activity.find();
        return res.json(allactivities);
    };

exports.createActivity = async (req,res) =>{
        try{
            const newactivity = await Activity.create(req.body);
            return res.status(201).json({status: "Success", result: newactivity});
        } catch(err) {
            return res.status(400).json({ error: err.message})
        }
    };

exports.getActivityByCode = async (req,res) => {
        const activity = await Activity.findOne({code: req.params.code});
        if(!activity){
            return res.status(404).json({error: "Activity not found"});
        }
        return res.json(activity);
    };

exports.updateActivityByCode = async (req,res) =>{
        const updated = await Activity.findOneAndUpdate({code: req.params.code}, { $set: req.body}, {new: true});

        if(!updated){
            return res.status(404).json({error: "Package not found"});
        }

        return res.status(201).json({status: "success", updated: updated});
    };

exports.deleteActivityByCode = async (req,res) =>{
        const deleted = await Activity.findOneAndDelete({code: req.params.code});

        if(!deleted){
            return res.status(404).json({error: "Package not found"});
        }

        return res.json({status: "success", deletedUser: deleted});
    };