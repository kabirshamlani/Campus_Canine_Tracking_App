const express = require('express');
const Vote = require("../models/Vote");
const User = require("../models/User");
const Dog = require("../models/Dog");
const router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const path = require('path');
const envPath = path.join(__dirname, '..', 'config.env');
dotenv.config({ path: envPath });

router.post('/', async (req, res) => {
    console.log(req.body);
    try {

        let dog_name = req.body.dog_name;
        const token = req.body.token;
        const x = jwt.verify(token, "secret_key_which_is_used_for***********protecting%%%%%all_the_backend_1237%@93y3______routes");
        const email = x.email;
        const user = await User.findOne({ Email: { $eq: email } });
        const dog = await Dog.findOne({ Name: { $eq: dog_name } });
        let vote = await Vote.findOne({ User_ID: { $eq: user._id }, Dog_ID: { $eq: dog._id } });
        let choice = "";
        let colour_vote = "";
        if (vote == null) {
            choice = "0"
        }
        else {
            choice = vote.Choice;
        }
        console.log("vote.Choice = ", vote.Choice);
        let friendly = dog.Nature.friendly;
        let docile = dog.Nature.docile;
        let aggressive = dog.Nature.aggressive;
        let max_val = Math.max(friendly, docile, aggressive);
        console.log("friendly = ", friendly, "docile = ", docile, "aggressive = ", aggressive, "max_val = ", max_val);
        let result = "";
        if (max_val === friendly){
            result = "Friendly";
            colour_vote = '#92e8ec';
        }
        else if (max_val === docile){
            colour_vote = '#67ec60';
            result = "Docile";
        }
        if (max_val === aggressive){
            result = "Aggressive";
            colour_vote = '#c70256';
        }
        res.send({ status: "ok", choice: choice, voting_result: result, colour: colour_vote });
    } catch {
        res.send({ status: "error" });
    }
});


module.exports = router;

/*
const express = require('express');
const Vote = require("../models/Vote");
const User = require("../models/User");
const Dog = require("../models/Dog");
const router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const path = require('path');
const envPath = path.join(__dirname, '..', 'config.env');
dotenv.config({ path: envPath });

router.post('/', async (req, res) => {
    console.log(req.body);
    try {

        let dog_name = req.body.dog_name;
        const token = req.body.token;
        const x = jwt.verify(token, "secret_key_which_is_used_for***********protecting%%%%%all_the_backend_1237%@93y3______routes");
        const email = x.email;
        const user = await User.findOne({ Email: { $eq: email } });
        const dog = await Dog.findOne({ Name: { $eq: dog_name } });
        let vote = await Vote.findOne({ User_ID: { $eq: user._id }, Dog_ID: { $eq: dog._id } });
        let choice = "";
        if (vote == null) {
            choice = "0"
        }
        else{
            choice = vote.Choice;
        }
        let friendly = dog.Nature.friendly;
        let docile = dog.Nature.docile;
        let aggressive = dog.Nature.aggressive;
        let max_val = Math.max(friendly, docile, aggressive);
        console.log("friendly = ", friendly, "docile = ", docile, "aggressive = ", aggressive, "max_val = ", max_val);
        let result = "";
        if (max_val === friendly)
            result = "Friendly";
        else if (max_val === docile)
            result = "Docile";
        if (max_val === aggressive)
            result = "Aggressive";
        res.send({ status: "ok", choice: choice, voting_result: result });
    } catch {
        res.send({ status: "error" });
    }
});


module.exports = router;*/