const express = require('express');
const Dog = require("../models/Dog");
const router = express.Router();
const jwt = require('jsonwebtoken')
const FuzzySearch = require('fuzzy-search');

router.post('/', async (req, res) => {
    try {
        let search = req.location;
        let x = []
        let documents = await Dog.find({});
        let totalProps = documents.reduce((a, obj) => a + Object.keys(obj).length, 0);
        totalProps /= 3;
        for (let i = 0; i < totalProps; i++)
            x = x.concat(documents[i].Name);
        const searcher = new FuzzySearch(x, ['Name'], {
            caseSensitive: false,
        });
        const result = searcher.search(search);
        console.log("result = ", result);
        res.send({ status: "ok", data: result, location: "search_map_locations.js" });
    } catch (error) {
        console.log(error);
        res.send({ status: "error", data: "Dogs Information Not Found" });
    }
})

module.exports = router;