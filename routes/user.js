'use strict';
const bcrypt = require('bcrypt');
const basicAuth = require('../src/Auth/basic');
const express = require('express');
const usersRouter = express.Router();
const { usersTable } = require('../src/Models');

usersRouter.use(express.json());

usersRouter.post('/signup', signUpHandler);
usersRouter.post('/signin', basicAuth, signIn );

async function signIn(req, res) {
  res.status(200).json(req.user);
}

async function signUpHandler(req, res) {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await usersTable.create({
      username: req.body.username,
      password: hashedPassword
    });
    res.status(201).send(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = usersRouter;
