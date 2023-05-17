const express = require('express');
const Dog_Location = require("../models/Dog_Location");
const router = express.Router();
const jwt = require('jsonwebtoken');

// Create a User using POST "/api/auth". Doesn't Require Auth.
router.post('/', async (req, res) => {
    console.log(req.body);

    let latitude = req.body.latitude;
    let longitude = req.body.longitude;

    const dog_location = await Dog_Location.find({});
    console.log("dog_location[0] = ", dog_location[0]);
    if (dog_location[0] == null) {
        let a = {
            "Latitude": latitude,
            "Longitude": longitude,
        }

        let b = {
            "Latitude": latitude,
            "Longitude": longitude,
        }
        let Location = []
        Location = Location.concat(a)
        Location = Location.concat(b)
        console.log("Location = ", Location);
        let obj = {
            Location,
            Pointer: "1",
        }
        console.log("obj = ", obj);
        const x = await Dog_Location(obj);
        x.save();
        res.send({ status: "ok", data: "Dog Data Inserted" });
    }
    else {
        try {
            const a = dog_location[0].Location[0];
            const b = dog_location[0].Location[1];
            const Pointer = dog_location[0].Pointer;
            let id = dog_location[0]._id;
            console.log("here", "Pointer = ", Pointer, "a = ", a, "b = ", b);
            let obj = {
                "Latitude": latitude,
                "Longitude": longitude,
            }

            if (Pointer == "0") {
                let array = []
                array = array.concat(obj)
                array = array.concat(b)
                console.log("array = ", array);
                // await Dog_Location.updateOne({ _id: id }, { $set: { a: obj, b: prev[0].a, Pointer: "b" } });
                await Dog_Location.updateOne({ _id: id }, { $set: { Location: array, Pointer: "1" } });
            }
            else if (Pointer == "1") {
                let array = []
                array = array.concat(a)
                array = array.concat(obj)
                console.log("array = ", array);
                console.log("id = ", id);
                // await Dog_Location.updateOne({ _id: id }, { $set: { b: obj, a: prev[0].b, Pointer: "a" } });
                await Dog_Location.updateOne({ _id: id }, { $set: { Location: array, Pointer: "0" } });
            }

            res.send({ status: "ok" });
        } catch {
            res.send({ status: "error", error: "Internal Server Error 500" });
        }
    }
});


module.exports = router;