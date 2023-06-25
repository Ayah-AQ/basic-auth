'use strict'
const bcrypt = require('bcrypt')
const basicAuth = require('../src/Auth/basic')
const express = require('express')
const usersRouter = express.Router()
const { usersTable } = require('../src/Models/index')

usersRouter.use(express.json())

usersRouter.post('/signup', basicAuth, signUpHandler);
usersRouter.post('/signin', basicAuth, signInHandler)

async function signInHandler(req,res) {
  const foundUser = await usersTable.findOne({where: {username: req.body.username}});
  if(foundUser) {
      const validUser = await bcrypt.compare(req.body.password, foundUser.password)
      if(validUser) {
          res.status(201).send(foundUser)
      } else {
          throw new Error('Invalid')
      }
  } else {
      throw new Error('Invalid Login')
  }
}
async function signUpHandler (req,res) {
  const newUser = await usersTable.create({
    username: req.body.username,
    password: req.body.password
  })
  res.status(201).send(newUser)
}

module.exports = usersRouter