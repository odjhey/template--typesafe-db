import { createServer } from 'http'
import * as persons from './data-services/person'

console.log('hello world')

const parse = (body: unknown): { ok: true; body: unknown } | { ok: false } => {
  try {
    const res = JSON.parse(`${body}`)
    return { ok: true, body: res }
  } catch (error) {
    return { ok: false }
  }
}

// simple http server

const server = createServer(async (req, res) => {
  // listen to /persons
  if (req.url === '/persons' && req.method === 'GET') {
    const list = await persons.list()
    // set json content type
    res.setHeader('Content-Type', 'application/json')
    return res.end(JSON.stringify(list))
  }

  if (req.url === '/persons' && req.method === 'POST') {
    // read body from payload request
    const body = await new Promise((resolve, reject) => {
      let body = ''
      req.on('data', (chunk) => {
        body += chunk.toString()
      })
      req.on('end', () => {
        resolve(body)
      })
    })

    const bodyResult = parse(body)
    if (bodyResult.ok === false) {
      res.statusCode = 400
      return res.end('Invalid JSON')
    }

    try {
      const createResult = await persons.createEntries([bodyResult.body as any])
      // set json content type
      res.setHeader('Content-Type', 'application/json')
      console.log(createResult)
      return res.end(JSON.stringify(createResult))
    } catch (e) {
      res.statusCode = 400
      return res.end('Invalid JSON ' + e.message)
    }
  }

  return res.end('404')
})

server.listen(3000, () => {
  console.log('Server is listening on port 3000')
})
