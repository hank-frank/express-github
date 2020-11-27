// const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();

const withAuth = (req, res, next) => {
    const userToken = req.headers.authorization;
    const correctToken = ` Bearer ${process.env.TOKEN}`;

    if (!userToken) {
        res.status(401).send('Unauthorized: No token provided');
    } else {
        if (userToken === correctToken) {
            res.status(401).send('Unauthorized: Invalid token');
        } else {
            next();
        }
    };
};

module.exports = withAuth;