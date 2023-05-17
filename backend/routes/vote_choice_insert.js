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
    let dog_name = req.body.dog_name;
    let dog_nature = req.body.dog_nature;
    let choice = req.body.choice;
    const token = req.body.token;
    // console.log("secret = ", process.env.JWT_SECRET, "token = ", token);
    const x = jwt.verify(token, "secret_key_which_is_used_for***********protecting%%%%%all_the_backend_1237%@93y3______routes");
    const email = x.email;
    // const email = "kabirshamlani04@gmail.com";
    // console.log("x = ", x);

    const user = await User.findOne({ Email: { $eq: email } });
    if (user == null) {
        res.send({ status: "error", error: "User does not exist" });
    }
    console.log("name = ", dog_name, "nature = ", dog_nature);
    const dog = await Dog.findOne({ Name: { $eq: dog_name }});
    if (dog == null) {
        res.send({ status: "error", error: "Dog does not exist" });
    }
    console.log("dog = ", dog);

    let oldVote = await Vote.findOne({ User_ID: { $eq: user._id }, Dog_ID: { $eq: dog._id } });
    console.log("oldVote= ", oldVote);
    if (oldVote == null) {
        let obj = {
            Dog_ID: dog._id,
            User_ID: user._id,
            Choice: choice,
        }
        const vote = await Vote(obj);
        vote.save();

        let docile_votes = dog.Nature.docile, friendly_votes = dog.Nature.friendly, aggressive_votes = dog.Nature.aggressive;
        let nature_obj = {
            "friendly": friendly_votes,
            "docile": docile_votes,
            "aggressive": aggressive_votes,
        }
        
        if (choice == 1)
            docile_votes += 1;
        else if (choice == 3)
            aggressive_votes += 1;
        else if (choice == 2)
            friendly_votes += 1;

        await Dog.updateOne({ _id: dog._id }, { $set: { Nature: nature_obj } });
        res.send({ status: "ok", data: "new vote created" });
    }
    else {
        try {
            let oldchoice = oldVote.Choice;
            let docile_votes = dog.Nature.docile, friendly_votes = dog.Nature.friendly, aggressive_votes = dog.Nature.aggressive;
            console.log("dog = ", dog);
            if (oldchoice == "1")
                docile_votes -= 1;
            else if (oldchoice == "3")
                aggressive_votes -= 1;
            else if (oldchoice == "2")
                friendly_votes -= 1;

            if (choice == "1")
                docile_votes += 1;
            else if (choice == "3")
                aggressive_votes += 1;
            else if (choice == "2")
                friendly_votes += 1;

            let nature_obj = {
                "friendly": friendly_votes,
                "docile": docile_votes,
                "aggressive": aggressive_votes,
            }

            // console.log("nature_obj = ", nature_obj);

            await Dog.updateOne({ _id: dog._id }, { $set: { Nature: nature_obj } });
            await Vote.updateOne({ User_ID: user._id, Dog_ID: dog._id }, { $set: { Choice: choice } });
            res.send({ status: "ok" });
        } catch {
            res.send({ status: "error", error: "Internal Server Error 500" });
        }
    }
});


module.exports = router;