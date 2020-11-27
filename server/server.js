const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require('dotenv').config();
const axios = require('axios');
const withAuth = require('./withAuth.js');

const app = express();

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(morgan("dev"));
// app.use(express.static('src'));

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header(
//         'Access-Control-Allow-Headers',
//         'Origin, X-Requested-With, Content-Type, Accept, Authorization'
//     );
//     if (req.method === 'OPTIONS') {
//         res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
//         return res.status(200).json({});
//     }
//     next();
// });

app.get('/', withAuth, (req,res) => {
    console.log('authorized!');
    res.status(200).send('Authorized');
});

app.post('/github', withAuth, async (req, res) => {
    const repoString = req.body.repo;

    const headers = {
        headers: {
            "Authorization": `Bearer ${process.env.GITHUB_TOKEN}`,
            "Content-Type": "application/json"
        }
    };

    let github = await axios.get('https://api.github.com/user/repos', headers);
    console.log(github);
});

module.exports = app;