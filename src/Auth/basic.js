'use strict';
const base64 = require('base-64');
const bcrypt = require('bcrypt');

function basicAuth(req, res, next) {
  if (req.body.username) {
    next();
  } else {
    const userData = req.headers.authorization;
    if (userData) {
      let encodedData = userData.split(' ')[1];
      let decodedData = base64.decode(encodedData).split(':');
      let username = decodedData[0];
      let password = decodedData[1];
      req.user = {
        username: username,
        password: password
      };
      next();
    } else {
      next(new Error('Invalid login'));
    }
  }
}

module.exports = basicAuth;
