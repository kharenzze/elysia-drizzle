import { test, expect, beforeAll } from 'bun:test'
import { createApp, App } from '../main'

let app: App

beforeAll(() => {
  app = createApp()
})

test('WIP', async () => {
  const req = new Request('http://localhost/api/v1/users/wip')
  const res = await app.handle(req)
  expect(res.status).toBe(200)
  const data = await res.text()
  expect(data).toEqual('wip')
})

test('User creation', async () => {
  const getReq = (body: object) => {
    return new Request('http://localhost/api/v1/users/', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  let req = getReq({ email: 'wip', password: 'wip' })
  let res = await app.handle(req)
  expect(res.status).toBe(400)

  req = getReq({ email: 'email@domain.com', password: 'asdASD$$33' })
  res = await app.handle(req)
  expect(res.status).toBe(200)
})
