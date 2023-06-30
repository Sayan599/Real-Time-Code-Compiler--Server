const express = require("express");
const app = express();

const mongoose = require('mongoose');
const dotenv = require('dotenv');

var compiler = require('compilex');
var options = { stats: true }; //prints stats on console 
compiler.init(options);

const path = require("path");
const { readdirSync, rmSync } = require('fs');
const fs = require('fs')
const userRoute = require('./controllers/user');
const programRoute = require('./controllers/program')

const cors = require('cors');

dotenv.config();
app.use(express.json());
app.use(cors());

//TO Connect Database
const connection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database Connected");
    } catch (err) {
        console.log(err);
    }
}

app.use("/api/user", userRoute);
app.use("/api/program", programRoute);

app.post("/code/java", (req, res) => {
    var code = req.body.code;
    var input = req.body.input;

    var envData = { OS: "windows", options: { timeout: 200 } };
    compiler.compileJavaWithInput(envData, code, input, function (data) {
        if (data.error) {
            res.status(200).json(data.error);
        }
        else {
            res.status(200).json(data.output);
        }
    });
})
app.post("/code/c", (req, res) => {
    var code = req.body.code;
    var input = req.body.input;
    var envData = { OS: "windows", cmd: "g++", options: { timeout: 1000 } }; // (uses g++ command to compile )
    compiler.compileCPPWithInput(envData, code, input, function (data) {
        if (data.error) {
            res.status(200).json(data.error);
        }
        else {
            res.status(200).json(data.output);
        }
    });
})
app.post("/code/python", (req, res) => {
    var code = req.body.code;
    var input = req.body.input;
    var envData = { OS: "windows" };
    compiler.compilePythonWithInput(envData, code, input, function (data) {
        if (data.error) {
            res.status(200).json(data.error);
        }
        else {
            res.status(200).json(data.output);
        }
    });
})

//TO DELETE THE temp files and folders
app.get('/delete', (req, res) => {
    fs.readdir('temp', (err, files) => {
        console.log(files.length);
        for (const file of files) {
            if (fs.lstatSync('temp/' + file).isDirectory()) {
                fs.rmdir(path.join('temp/' + file), { recursive: true }, (err) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log("Recursively delete")
                    }
                })
            } else {
                fs.unlink(path.join('temp/' + file), (err) => {
                    if (err) {
                        console.log(err);
                    }
                })
            }
        }
        res.status(200).status("Deleted");
    })
})

app.listen("5500", () => {
    console.log("Connected to the Back");
    connection();
})