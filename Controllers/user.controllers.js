const { Userschema } = require("../Models/user.models")
const nodemailer = require("nodemailer")
const jwt = require("jsonwebtoken")
const axios = require("axios")
const env = require("dotenv")
const secret = process.env.SECRET
const adminsecret = process.env.ADMIN_SECRET
const cloudinary = require("cloudinary")
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const UAParser = require('ua-parser-js');
env.config()


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
});

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
            const mailOptions = {
                from: process.env.USER_EMAIL,
                to: req.body.Email,
                subject: 'DATASUB',
                html: `
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Email</title>
                    </head>
                    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="width: 100%; max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                            <tr>
                                <td align="center">
                                    <h1 style="color: #333333;">DATASUB</h1>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p style="color: #555555;">Hello ${req.body.Username},</p>
                                    <p style="color: #555555;">Thanks for creating an account with DATASUB click on the link below to join the group</p>
                                    <p style="color: #555555;">https://wa.me/message/6L2NE6QD6DYFN1</p>

                                </td>
                            </tr>
                            <tr>
                                <td align="center" style="padding-top: 20px;">
                                    <a href="" style="text-decoration: none; color: #ffffff; background-color: #007bff; padding: 10px 20px; border-radius: 5px; display: inline-block;">Read More</a>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding-top: 20px; color: #777777;">

                                     <p>Best regards,<br>DATASUB Team</p>
                                </td>
                            </tr>
                        </table>
                    </body>
                    </html>
                `
            };
            const info = await transporter.sendMail(mailOptions);
            console.log('Email sent: ' + info.response);
            const newUser = new Userschema(req.body);
            await newUser.save();
            console.log("User saved");
            res.send({ status: true, message: "Successfully Registered" });
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



module.exports.userLogin = (req, res) => {
    let { Email, Password } = req.body;
    function getCurrentDateTime() {
        const now = new Date();
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        };
        return now.toLocaleDateString('en-US', options);
    }
    const currentDateTime = getCurrentDateTime();
    const parser = new UAParser();
    const userAgent = req.headers['user-agent'];
    const parsedUserAgent = parser.setUA(userAgent).getResult();
    const deviceInfo = `${parsedUserAgent.browser.name} on ${parsedUserAgent.os.name}`;
    Userschema.findOne({ Email: Email }).then(async (user) => {
        if (!user) {
            res.status(200).json({ message: "Email Not Found", status: false })
            console.log("Email not found");
        }
        else {
            const correctpassword = await user.compareUser(Password)
            if (!correctpassword) {
                res.status(200).json({ message: "Incorrect Password", status: false })
                console.log("Incorrect Password");
            }
            else {
                let token = jwt.sign({ id: user.id, email: user.Email }, secret, { expiresIn: "24h" })
                const userData = {
                    userId: user.id,
                    // fullName: user.Fullname,
                    username: user.Username,
                    number: user.Number,
                    email: user.Email,
                }
                res.status(200).json({ message: "Login Success", status: true, token, userData })
                // console.log("user success texting mode", userData)
                // console.log("My backend token", token);
                const mailOptions = {
                    from: process.env.USER_EMAIL,
                    to: req.body.Email,
                    subject: 'DATASUB',
                    html: `
                        <!DOCTYPE html>
                        <html lang="en">
                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>Email</title>
                        </head>
                        <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="width: 100%; max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                                <tr>
                                    <td align="center">
                                        <h1 style="color: #333333;">DATASUB</h1>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p style="color: #555555;">Hello ${user.Username},</p>
                                        <p style="color: #555555;">
                                        You successfully logged into your account on ${currentDateTime} using ${deviceInfo}. Thank you for your patronage.
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" style="padding-top: 20px;">
                                        <a href="http://localhost:5173" style="text-decoration: none; color: #ffffff; background-color: #007bff; padding: 10px 20px; border-radius: 5px; display: inline-block;">Read More</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding-top: 20px; color: #777777;">
                                        <p>Best regards,<br>DATASUB Team</p>
                                    </td>
                                </tr>
                            </table>
                        </body>
                        </html>
                    `
                };
                const info = await transporter.sendMail(mailOptions);
                console.log('Email sent: ' + info.response);
            }
        }
    })
        .catch((err) => {
            console.log("error occured", err);
            return res.status(200).json({ message: "Error Occured", status: false })
        })
}

module.exports.dashboard = async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).send({ status: false, message: "Authorization token missing" });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, secret);
        const user = await Userschema.findById(decoded.id);
        if (!user) {
            return res.status(404).send({ status: false, message: "User not found" });
        }

        // Send user data
        res.send({
            status: true,
            message: "Token verified successfully",
            user: user.toObject(),
        });
    } catch (err) {
        console.error("Error:", err);
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).send({ status: false, message: "Invalid token" });
        }
        res.status(500).send({ status: false, message: "Internal server error" });
    }
}





module.exports.adminlogin = async (req, res) => {
    const { Email, Password } = req.body;
    const Admin_login = process.env.Admin_login
    try {
        // Check if the email matches the admin email
        if (Email !== Admin_login) {
            console.log("Access denied. Admin only.");
            return res.status(403).json({ message: 'Access denied. Admin only.' });
        }

        // Find the user with this email
        const user = await Userschema.findOne({ Email });
        if (!user) {
            console.log("Admin not found.");
            return res.status(404).json({ message: 'Admin not found.' });
        }

        // Check if the password is correct
        const isMatch = await bcrypt.compare(Password, user.Password);

        if (!isMatch) {
            console.log("Invalid credentials.");
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user._id, isAdmin: true }, adminsecret, { expiresIn: '1h' });

        res.status(200).json({
            status: true,
            message: 'Admin login successful.',
            token,
        });
        

    } catch (error) {
        console.error('Server Error:', error);  // Log the actual error
        res.status(500).json({ message: 'Server error.' });
    }
};
