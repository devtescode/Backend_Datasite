const Service = require("../models/Service");


exports.createdataplans = async (req, res) => {
    try {
        const { network, dataType, name, price, duration } = req.body;
        const newService = new Service({ network, dataType, name, price, duration });
        await newService.save();
        console.log("Service Created", newService);
        
        res.status(201).json({ message: "Service Created", service: newService });
    } catch (error) {
        res.status(500).json({ error: "Failed to create service" });
    }
};

exports.getuserscreatedataplans = async(req, res)=>{
    try {
        const plans = await Service.find(); // Fetch all plans
        res.json(plans);
        console.log("get data plans", plans);
        
    } catch (error) {
        res.status(500).json({ message: "Error fetching plans" });
    }
}