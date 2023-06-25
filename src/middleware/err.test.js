'use strict'

const { app } = require("../server")
const supertest = require('supertest')
const mockServer = supertest(app)

describe('test bad route', () => {
  test('404 error', async () => {
    const result = await mockServer.get('/bad')
    expect(result.status).toEqual(404)
  })
})