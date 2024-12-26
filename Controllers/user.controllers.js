const { Userschema } = require("../Models/user.models")
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

module.exports.userRegister = async (req, res) => {
    const { Email, Username } = req.body;
    try {
        const existingUser = await Userschema.findOne({ Email: Email });
        if (existingUser) {
            console.log("Email is already in use");
            return res.status(200).json({ message: "Email is already in use", status: false });
        }
        const existingUsername = await Userschema.findOne({ Username: Username });
        if (existingUsername) {
            console.log("Username is already in use");
            return res.status(200).json({ message: "Username is already in use", status: false });
        }
        else {
            // const mailOptions = {
            //     from: process.env.USER_EMAIL,
            //     to: req.body.Email,
            //     subject: 'PETPORT',
            //     html: `
            //         <!DOCTYPE html>
            //         <html lang="en">
            //         <head>
            //             <meta charset="UTF-8">
            //             <meta name="viewport" content="width=device-width, initial-scale=1.0">
            //             <title>Email</title>
            //         </head>
            //         <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
            //             <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="width: 100%; max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
            //                 <tr>
            //                     <td align="center">
            //                         <h1 style="color: #333333;">PETPORT</h1>
            //                     </td>
            //                 </tr>
            //                 <tr>
            //                     <td>
            //                         <p style="color: #555555;">Hello ${req.body.Fullname},</p>
            //                         <p style="color: #555555;">Thanks for creating an account with PETPORT click on the link below to join the group</p>
            //                         <p style="color: #555555;">https://wa.me/message/6L2NE6QD6DYFN1</p>

            //                     </td>
            //                 </tr>
            //                 <tr>
            //                     <td align="center" style="padding-top: 20px;">
            //                         <a href="http://localhost:5173" style="text-decoration: none; color: #ffffff; background-color: #007bff; padding: 10px 20px; border-radius: 5px; display: inline-block;">Read More</a>
            //                     </td>
            //                 </tr>
            //                 <tr>
            //                     <td style="padding-top: 20px; color: #777777;">

            //                          <p>Best regards,<br>PETPORT Team</p>
            //                     </td>
            //                 </tr>
            //             </table>
            //         </body>
            //         </html>
            //     `
            // };
            // const info = await transporter.sendMail(mailOptions);
            // console.log('Email sent: ' + info.response);
            const newUser = new Userschema(req.body);
            await newUser.save();
            console.log("User saved");
            res.send({ status: true, message: "Success" });
        }
    } catch (err) {
        if (err.code === 11000 && err.keyPattern && err.keyPattern.Email) {
            console.log("Email is already registered");
            return res.status(400).json({ message: "Email is already registered", status: false });
        } else {
            console.log("Error occurred:", err);
            return res.status(500).json({ message: "Internal Server Error", status: false });
        }
    }
}