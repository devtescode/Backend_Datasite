const {Userschema} = require("../Models/user.models")
const nodemailer = require("nodemailer")
const jwt = require("jsonwebtoken")
const axios = require("axios")
const env = require("dotenv")
const secret = process.env.SECRET
const cloudinary = require("cloudinary")
const mongoose = require("mongoose")
env.config()


// var transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.USER_EMAIL,
//         pass: process.env.USER_PASSWORD
//     },
//     tls: {
//         rejectUnauthorized: false
//     }
// });

// cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.API_KEY,
//     api_secret: process.env.API_SECRETCLOUD
// });

module.exports.userWelcome = (req, res) => {
    res.send('welcome here my user')
    console.log("weolcone to");
}