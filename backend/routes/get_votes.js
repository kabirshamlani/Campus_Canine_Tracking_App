const express = require('express');
const Dog = require("../models/Dog");
const Vote = require("../models/Vote");
const router = express.Router();

router.post('/', async (req, res) => {
    // console.log("req = ", req);
    try {
        const name = req.body.name;
        let documents = await Dog.find({ Name: { $eq: name } });
        res.send({ status: "ok", data: documents[0].Nature, location: "dogs_list.js" });
    } catch (error) {
        console.log(error);
        res.send({ status: "error", data: "Dogs Information Not Found" });
    }
})


module.exports = router;