const express = require('express');
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const path = require('path');
const envPath = path.join(__dirname, '..', 'config.env');
dotenv.config({ path: envPath });

router.post('/', async (req, res) => {
    console.log(req.body);
    let name = req.body.Name;
    let locality = req.body.Locality;
    let email = req.body.Email;
    let password = req.body.Password;
    console.log("name = ", name, "locality = ", locality, "email = ", email, "password = ", password);

    const encryptedPassword = await bcrypt.hash(password, 10);
    console.log(encryptedPassword);
    if (!body("email", "Enter a Valid Email").isEmail())
    {
        return res.send({status: 400, erross: erros.array()});
    }
    const oldUser = await User.findOne({ Email: { $eq: email } });
    console.log(oldUser);
    if (oldUser == null) {
        let obj = {
            Name: name,
            Email: email,
            Locality: locality,
            Password: encryptedPassword,
        }
        const user = await User(obj);
        user.save();
        const token = jwt.sign({email: email}, process.env.JWT_SECRET);
        console.log("token = ", token);
        return res.json({status: "ok", token: token, email: email, password: password, name: name, locality: locality});
    }
    else {
        res.send({ error: "User Exists" });
    }
})


module.exports = router;