const express = require('express');
const Dog = require("../models/Dog");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

// Create a Dog using POST "/api/auth". Doesn't Require Auth.
router.post('/', async (req, res) => {
    console.log(req.body);
    let dogid = req.body.Dog_ID;
    let name = req.body.Name;
    let nature = req.body.Nature;
    let general_features = req.body.General_Features;
    let frequently_visited_places = req.body.Frequently_Visited_Places;
    let location_coordinates = req.body.Location_Coordinates;
    console.log("name = ", name, "nature = ", nature, "dogid = ", dogid, "general_features = ", general_features, "frequently_visited_places = "
    , frequently_visited_places, "location_coordinates = ", location_coordinates);
    const oldDog = await Dog.findOne({ Dog_ID: { $eq: dogid } });
    if (oldDog == null) {
        let obj = {
            Name: name,
            Nature: nature,
            Dog_ID: dogid,
            General_Features: general_features,
            Frequently_Visited_Places: frequently_visited_places,
            Location_Coordinates: location_coordinates,
        }
        const dog = await Dog(obj);
        dog.save();
        res.send({ status: "ok" });
    }
    else {
        res.send({ error: "User Exists" });
    }
})


module.exports = router;