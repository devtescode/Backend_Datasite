const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
    network: { type: String, required: true }, // Add network
    dataType: { type: String, required: true }, // Add dataType
    name: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: String, required: true }, // Add duration
    createdAt: { type: Date, default: Date.now }
});
 

module.exports = mongoose.model("Service", ServiceSchema);
