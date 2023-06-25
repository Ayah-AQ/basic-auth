'use strict'
const base64 = require('base-64');
const bcrypt = require('bcrypt');

function basicAuth (req, res, next) {
    if(req.body.username) {
        let password = bcrypt.hashSync(req.body.password, 5);
        req.body.password = password
        next()
    } else {
        const userData = req.headers.authorization
        if(userData) {
            let encodedData = userData.split(" ")[1];
            let decodedData = base64.decode(encodedData).split(":")
            req.body.username = decodedData[0];
            req.body.password = decodedData[1];
            next();
        }
    }
}

module.exports = basicAuth