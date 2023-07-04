'use strict';
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const { usersTable } = require('../Models');

    async function basicAuthMiddleWare(req, res, next){
    if(req.headers.authorization){
      const basicHeaderParts = req.headers.authorization.split(' ');
      const encodedValues= basicHeaderParts.pop(); 
      const decodedValues = base64.decode(encodedValues); 
      const [username, password] = decodedValues.split(':');
      
      const user = await usersTable.findOne({ where: { username } });
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        req.user = user;
        next();
      }
      else {
        res.status(401).send('Invalid password');
        throw new Error('this user is invalid');
      }
  }}
  module.exports = basicAuthMiddleWare;