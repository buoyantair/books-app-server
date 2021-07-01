const jwt = require('jsonwebtoken')
const app = require('../../app')
const server = app.listen()
const request = require('supertest').agent(server)

jest.mock('jsonwebtoken')
jwt.sign.mockReturnValueOnce('token')

const username = 'admin'
const password = 'hello123'

describe('routes: /auth/*', () => {
  afterAll(() => {
    server.close()
  })

  describe('POST /auth/login', () => {
    it('should return a signed jwt token when a POST request with username & password is sent to /auth/login', async () => {
      const response = await request
        .post('/auth/login')
        .set('Accept', 'application/json')
        .send({
          username,
          password
        })

      expect(response.status).toEqual(200)
      expect(response.type).toEqual('application/json')
      expect(response.body.token).toBeDefined()
      expect(typeof response.body.token).toEqual('string')
    })

    it('should return an error message when password is not set', async () => {
      const response = await request.post('/auth/login')
        .set('Accept', 'application/json')
        .send({
          username
        })

      expect(response.status).toEqual(401)
      expect(response.type).toEqual('application/json')
      expect(response.body.message).toBeDefined()
      expect(response.body.message).toEqual('Please provide a password to login.')
    })

    it('should return an error message when username is not set', async () => {
      const response = await request.post('/auth/login')
        .set('Accept', 'application/json')
        .send({
          password
        })

      expect(response.status).toEqual(401)
      expect(response.type).toEqual('application/json')
      expect(response.body.message).toBeDefined()
      expect(response.body.message).toEqual('Please provide a username to login.')
    })

    it('should return an error message when the user does not exist', async () => {
      const response = await request.post('/auth/login')
        .set('Accept', 'application/json')
        .send({
          username: 'lalaland',
          password: 'woowiie'
        })

      expect(response.status).toEqual(401)
      expect(response.type).toEqual('application/json')
      expect(response.body.message).toBeDefined()
      expect(response.body.message).toEqual('The specified account does not exist')
    })
  })
})
