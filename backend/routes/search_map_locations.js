const express = require('express');
const User = require("../models/User");
const router = express.Router();
const jwt = require('jsonwebtoken')
const FuzzySearch = require('fuzzy-search');

router.post('/', async (req, res) => {
    try {
        let search = req.location;
        let x = []
        let documents = await User.find({});
        console.log("documents = ", documents);
        let totalProps = documents.reduce((a, obj) => a + Object.keys(obj).length, 0);
        totalProps /= 3;
        for (let i = 0; i < totalProps; i++)
            x = x.concat(documents[i].Locality);

        const searcher = new FuzzySearch(x, ['Locality'], {
            caseSensitive: false,
        });
        const result = searcher.search(search);
        const s = new Set();
        for (let i = 0; i < result.length; i++)
            s.add(result[i]);        
        let ans = []
        for (const item of s)
            ans = ans.concat(item);
        res.send({ status: "ok", data: ans, location: "search_map_location.js" });
    } catch (error) {
        console.log(error);
        res.send({ status: "error", data: "Map Location Information Not Found" });
    }
})

module.exports = router;