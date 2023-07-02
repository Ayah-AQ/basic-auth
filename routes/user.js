'use strict';
const bcrypt = require('bcrypt');
const basicAuth = require('../src/Auth/basic');
const express = require('express');
const usersRouter = express.Router();
const { usersTable } = require('../src/Models');

usersRouter.use(express.json());

usersRouter.post('/signup', signUpHandler);
usersRouter.post('/signin', signInHandler);

async function signInHandler(req, res) {
  try {
    const foundUser = await usersTable.findOne({ where: { username: req.body.username } });
    if (foundUser) {
      const validUser = await bcrypt.compare(req.body.password, foundUser.password);
      if (validUser) {
        res.status(201).send(foundUser);
      } else {
        res.status(401).json({ error: 'Invalid password' });
      }
    } else {
      res.status(401).json({ error: 'Invalid username' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
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
