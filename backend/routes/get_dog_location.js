const express = require('express');
const Dog_Location = require("../models/Dog_Location");
const router = express.Router();

// Create a User using POST "/api/auth". Doesn't Require Auth.
router.post('/', async (req, res) => {
    const dog_location = await Dog_Location.find({});
    let x = dog_location[0].Location[0];
    let y = dog_location[0].Location[1];
    let ptr = dog_location[0].Pointer;
    let z = parseInt(ptr)
    if (!z)
        res.send({ status: "ok", latitude: y.Latitude, longitude: y.Longitude});
    else
        res.send({ status: "ok", latitude: x.Latitude, longitude: x.Longitude});
});


module.exports = router;