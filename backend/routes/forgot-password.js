const express = require('express');
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const path = require('path');
const envPath = path.join(__dirname, '..', 'config.env');
dotenv.config({ path: envPath });

router.post("/", async (req, res) => {
    const email = req.body.email;
    console.log("Forgot Password Route hello");
    try {
        const oldUser = await User.findOne({ Email: {$eq: email } });
        if (!oldUser) {
            return res.json({ status: "User Not Found" });
        }
        // const secret = process.env.JWT_SECRET + oldUser.Password;
        const secret = process.env.JWT_SECRET;
        console.log("secret = ", secret, "oldUser = ", oldUser);
        // const token = jwt.sign({ email: oldUser.Email, id: oldUser._id }, secret, { expiresIn: '5m' });
        const token = jwt.sign({ email: oldUser.Email, id: oldUser._id }, secret);
        // const link = `http://192.168.2.6:10000/reset-password/${oldUser.Email}/${token}`;
        const link = `http://localhost:10000/reset-password/${oldUser.Email}/${token}`;
        console.log(link);

        // let testAccount=await nodemailer.createTestAccount();
        var transporter = nodemailer.createTransport({
            service: 'gmail',

            auth: {
                email: 'kabirshamlani04@gmail.com',
                password: 'yyebhnwpdvlimbzn',
            },
        });

        var mailOptions = {
            from: 'youremail@gmail.com',
            to: email,
            subject: 'Password reset',
            text: link 
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        // console.log(link);
    }
    catch (error) {
        console.log(error);
    }
})

module.exports = router;