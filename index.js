'use strict';
require('dotenv').config()
const {start, database} = require('./src/server')


database.sync()
    .then(() => {
        start(process.env.PORT)
    })