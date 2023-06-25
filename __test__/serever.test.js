'use strict'

const { app, database } = require("../src/server");
const supertest = require('supertest');
const mockServer = supertest(app);
const base64 = require('base-64')
const bcrypt = require('bcrypt');
const basicAuth = require('../src/Auth/basic')

beforeAll(async () => {
  await database.sync();
});

describe('Tests for users signin and signup', () => {
  test('POST to /signup to create a new user.', async () => {
    const result = await mockServer.post('/signup').send({
      username: "aya",
      password: "1234"
    })
    expect(result.status).toEqual(201)
  });
  test('POST to /signin to login as a user (use basic auth)', async () => {
    const req = {
      headers: {
        authorization: `Basic ${base64.encode("aya:1234")}`
      },
      body: {
        username: undefined
      }
    }
    const res = {}
    const next = jest.fn()
    const result = await basicAuth(req,res,next)
    expect(next).toHaveBeenCalled()
  })
})

afterAll(async () => {
  await database.drop();
});

