const express = require('express');
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const path = require('path');
const envPath = path.join(__dirname, '..', 'config.env');
dotenv.config({ path: envPath });

router.post('/', async(req, res) => {
    console.log("Login here");
    console.log(req.body);
    let email = req.body.email;
    let password = req.body.password;
    
    const user = await User.findOne({ Email: { $eq: email }});
    if (user == null)
    {
        res.send({ error: "User Does Not Exist. Please Register First." });
    }
    else if (await bcrypt.compare(password, user.Password)) {
        const token = jwt.sign({email: user.Email, userId: user._id}, process.env.JWT_SECRET);
        if (res.status(201)){
            return res.json({status: "ok", token: token, email: user.Email, password: password, name: user.Name, age: user.Age, locality: user.Locality, userId: user._id});
        }
        else{
            return res.json({error: "error"});
        }
    }
    else
        res.json({status: "error", error: "Invalid Password"});
})

module.exports = router;