const app = require('../../app')
const server = app.listen()
const request = require('supertest').agent(server)

describe('routes: /health', () => {
  afterAll(() => {
    server.close()
  })

  it('GET /health', async () => {
    const response = await request.get('/health')
    expect(response.status).toEqual(200)
    expect(response.type).toEqual('text/plain')
    expect(response.text).toEqual('Everything is working well!')
  })
})
