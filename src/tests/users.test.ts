import { describe, test, expect, beforeAll } from 'bun:test'
import { createApp, App } from '../main'
import type { UserData } from '../models/sqlite'

let app: App

beforeAll(async () => {
  app = await createApp({
    sqlitePath: ':memory:',
  })
})

describe('User creation', async () => {
  const createUserReq = (body: object) => {
    return new Request('http://localhost/api/v1/users/', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  test('WIP', async () => {
    const req = new Request('http://localhost/api/v1/users/wip')
    const res = await app.handle(req)
    expect(res.status).toBe(200)
    const data = await res.text()
    expect(data).toEqual('wip')
  })

  test('Invalid password', async () => {
    let req = createUserReq({ email: 'wip', password: 'wip' })
    let res = await app.handle(req)
    expect(res.status).toBe(400)
  })

  test('Valid user creation', async () => {
    let req = createUserReq({ email: 'email@domain.com', password: 'asdASD$$33' })
    let res = await app.handle(req)
    expect(res.status).toBe(200)
    const data: UserData = await res.json()
    expect(data.id).toBeString()
    expect(data.id.length).toBeGreaterThan(0)
    expect(data.email).toBe('email@domain.com')
    expect(data.createdAt).toBeString()
  })

  test(`Try to create an user that's already registered`, async () => {
    let req = createUserReq({ email: 'another@domain.com', password: 'asdASD$$33' })
    let res = await app.handle(req)
    expect(res.status).toBe(200)
    req = createUserReq({ email: 'another@domain.com', password: 'asdZZZ$$33' })
    res = await app.handle(req)
    expect(res.status).toBe(409)
  })
})
