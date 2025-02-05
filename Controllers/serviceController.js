const { default: axios } = require("axios");
const Service = require("../models/Service");
const env = require("dotenv")
env.config()


exports.createdataplans = async (req, res) => {
    try {
        const { network, dataType, plans } = req.body;

        // Check if the network allows the requested dataType
        const allowedDataTypes = {
            "MTN": ["AWOOF GIFTING", "CORPORATE GIFTING", "SME", "SME2", "DATA COUPON", "GIFTING"],
            "AIRTEL": ["AWOOF GIFTING", "CORPORATE GIFTING", "GIFTING"],
            "GLO": ["AWOOF GIFTING", "CORPORATE GIFTING", "GIFTING"],
            "9MOBILE": ["AWOOF GIFTING", "CORPORATE GIFTING", "GIFTING"],
        };

        if (!allowedDataTypes[network].includes(dataType)) {
            return res.status(400).json({ error: `Invalid data type for ${network}` });
        }

        let existingService = await Service.findOne({ network, dataType });

        if (existingService) {
            // Add new plans to the existing service if it exists
            existingService.plans.push(...plans);
            await existingService.save();
        } else {
            // If no existing service for this network and dataType, create one
            existingService = new Service({
                network,
                dataType,
                plans,
            });
            await existingService.save();
        }

        res.status(201).json({ message: "Service Created", service: existingService });
    } catch (error) {
        res.status(500).json({ error: "Failed to create service", details: error.message });
    }
};



exports.getuserscreatedataplans = async (req, res) => {
    try {
        const { network, dataType } = req.query; // Get both network and dataType from query parameters
        let query = {};

        // Filter by network if provided
        if (network) {
            query.network = network;
        }

        // Filter by dataType if provided
        if (dataType) {
            query.dataType = dataType;
        }

        // Find services by network and dataType
        const plans = await Service.find(query);

        if (plans.length === 0) {
            return res.status(404).json({ message: "No plans found for the specified criteria." });
        }

        res.json(plans); // Return the fetched plans
        console.log("Fetched data plans:", plans);
    } catch (error) {
        res.status(500).json({ message: "Error fetching plans", error: error.message });
    }
};


module.exports.userbuydata =async(req, res)=>{
    try {
        const { network, dataType, plan, phoneNumber } = req.body;
        // console.log(req.body);
        // console.log(process.env.API_KEY_DATA);
        
        // Your API request logic here
        const response = await axios.post("", {
            network,
            dataType,
            plan,
            phoneNumber
        }, {
            headers: {
                "Authorization": `Bearer ${process.env.API_KEY_DATA}`,
                "Content-Type": "application/json"
            }
        });
       
        


        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Error purchasing data", error });
    }
}
