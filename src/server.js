'use strict';
const { sequelize } = require('./Models/index')
const express = require('express');
const app = express();

const usersRouter = require('../routes/user');
const notFound = require('./middleware/404')
const internalError = require('./middleware/500')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.status(200).send("hello ");
})

app.use(usersRouter);
app.use(notFound);
app.use(internalError);

function start(port) {
  app.listen(port, () => {
    console.log("Server is running and listening on port " + port);
  })
}

module.exports = {
  app: app,
  start: start,
  database: sequelize
}