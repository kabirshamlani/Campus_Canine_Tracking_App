const express = require('express');
const User = require("../models/User");
const Comment = require("../models/Comment");
const Dog = require("../models/Dog");
const router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const path = require('path');
const envPath = path.join(__dirname, '..', 'config.env');
dotenv.config({ path: envPath });

router.post('/', async (req, res) => {
    // console.log(req.body);
    try {
        let dog_name = req.body.dog_name;
        const token = req.body.token;
        let comment = req.body.comment;
        console.log("dog_name = ", dog_name, "token = ", token, "comment = ", comment);
        const x = jwt.verify(token, "secret_key_which_is_used_for***********protecting%%%%%all_the_backend_1237%@93y3______routes");
        // const x = jwt.verify(token, process.env.JWT_SECRET);
        const email = x.email;
        const user = await User.findOne({ Email: { $eq: email } });
        const dog = await Dog.findOne({ Name: { $eq: dog_name } });
        console.log(dog)
        let obj = {
            Dog_Id: dog._id,
            Comment: comment,
            Posted_By: user.Name
        }
        console.log("obj = ", obj);
        let y = await Comment(obj);
        y.save();
        res.send({ status: "ok" });
    } catch {
        res.send({ status: "error" });
    }
});


module.exports = router;