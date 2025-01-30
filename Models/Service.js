const mongoose = require("mongoose");

// const PlanSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     price: { type: Number, required: true },
//     duration: { type: String, required: true }
// });

// const ServiceSchema = new mongoose.Schema({
//     network: { type: String, required: true }, // Add network
//     dataType: { type: String, required: true }, // Add dataType
//     name: { type: String, required: true },
//     price: { type: Number, required: true },
//     duration: { type: String, required: true }, // Add duration
//     createdAt: { type: Date, default: Date.now }
// });
const ServiceSchema = new mongoose.Schema({
    network: {
        type: String,
        required: true,
    },
    dataType: {
        type: String,
        required: true,
    },
    plans: [{
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        duration: {
            type: Number,
            required: true,
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

 

module.exports = mongoose.model("Service", ServiceSchema);
