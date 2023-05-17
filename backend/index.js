const connectDB = require('./connectDB');
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' })
require("./models/User")
const File = require('./models/File');
const path = require('path');
const upload = require('./routes/file_upload');


connectDB;
const app = express();
const port = 10000;
//10.2.131.234
app.use(cors());
app.use(express.json());

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(express.static(`${__dirname}/public`))

// Available Routes
app.use("/api/auth", require("./routes/register.js"))
app.use("/api/login", require("./routes/login.js"))
app.use("/api/dog_data_push", require("./routes/dog_data_push.js"))
app.use("/api/forgot-password", require("./routes/forgot-password.js"))
app.use("/api/reset-password/:email/:token", require("./routes/reset-password.js"))
app.use("/api/search_map_locations", require("./routes/search_map_locations.js"))
app.use("/api/search_dog_list", require("./routes/search_dog_list.js"))
app.use("/api/vote_choice_insert", require("./routes/vote_choice_insert.js"))
app.use("/api/get_votes", require("./routes/get_votes.js"))
app.use("/api/update_dog_location", require("./routes/update_dog_location.js"))
app.use("/api/get_dog_location", require("./routes/get_dog_location.js"))
app.use("/api/vote_result", require("./routes/vote_result.js"))
app.use("/api/comments", require("./routes/comments.js"))

app.listen(port, () => {
    console.log(`Connection Started at http://localhost:${port}`);
})


app.get("/api/reset-password/:id/:token", async (req, res) => {
    const { id, token } = req.params;
    const oldUser = await User.findOne({ _id: id });
    if (!oldUser) {
        return res.json({ status: "User Not Found" });
    }
    const secret = process.env.JWT_SECRET + oldUser.Password;

    try {
        const verify = jwt.verify(token, secret);
        res.render("index", { email: verify.email, status: "Not Verified" });

    } catch (error) {
        console.log(error);
        res.send("User Not verfied");

    }
});


app.post("/api/getFiles", async (req, res) => {
    try {
        let files = await File.find({});
        let paths = [];
        let totalProps = files.reduce((a, obj) => a + Object.keys(obj).length, 0);
        totalProps /= 3;
        for (let i = 0; i < totalProps; i++)
        {
            const absolutePath = path.resolve(`./uploads/${files[i].name}`);
            paths = paths.concat(absolutePath);
        }
        res.send({status: "ok", data: paths, location: "index.js"});
    } catch (error) {
        res.send({status: "error", error: error, location: "index.js"});
    }
});


// app.post("/api/getFiles", async (req, res) => {
//     console.log("get request of files made");
//     try {
//         const files = await File.find({});
//         console.log("files = ", files);
//         res.send({status: "ok", data: files, location: "index.js"});
//     } catch (error) {
//         res.send({status: "error", error: error, location: "index.js"});
//     }
// });


app.post('/api/file_upload', upload.single('filename'), async function(req, res) {
    try {
        const newFile = await File.create({
            name: req.file.filename
        })
        res.send({status: "ok", message: "File Created Successfully!!"});
    } catch(err) {
        console.log("error = ", err);
        res.send({status: "error", error: err});
    }
});