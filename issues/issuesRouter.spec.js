const request = require('supertest')
const server = require('../api/server')

describe('Issues endpoints', () => {
  describe('[GET] /api/issues', () => {
      test('returns 200 OK status code when', () => {
          return request(server).get('/api/issues')
          .expect(200)
      })

      test('returns an array', async () => {
        const response = await request(server).get('/api/issues')

        expect(Array.isArray(response.body.data)).toBe(true)
      })
  })  
})