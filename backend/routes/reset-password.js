const express = require('express');
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const path = require('path');
const envPath = path.join(__dirname, '..', 'config.env');
dotenv.config({ path: envPath });

router.post("/", async (req, res) => {
    // const { id, token } = req.params;
    // const { password } = req.body;
    const email = req.body.email;
    const token = req.body.token;
    const password = req.body.password;
    const oldUser = await User.findOne({ Email: email });
    if (!oldUser) {
        return res.json({ status: "User Not Found" });
    }
    // const secret = process.env.JWT_SECRET + oldUser.Password;
    const secret = process.env.JWT_SECRET;
    console.log("secret = ", secret, "oldUser=", oldUser);
    try {
        const verify = jwt.verify(token, secret);
        const encryptedPassword = await bcrypt.hash(password, 12);
        await User.updateOne({ Email: email }, { $set: { password: encryptedPassword }} );
        // res.json({status:"Password Updated Successfully"});
        // res.render("index", { email: verify.email, status: "verified" });
        res.send({ status: "ok", data: "Password Updated Successfully"});
    } catch (error) {
        console.log(error);
        res.json({ status: "Something Went Wrong" });
        // res.send("User Not verfied");

    }
    // console.log(req.params);
    // res.send("done");

});

module.exports = router;