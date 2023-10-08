import { test, expect, beforeAll } from 'bun:test'
import { createApp, App } from '../main'

let app: App

beforeAll(() => {
  app = createApp()
})

test('Health', async () => {
  const req = new Request('http://localhost/health')
  const res = await app.handle(req)
  expect(res.status).toBe(200)
  const data = await res.json()
  expect(data).toEqual({ status: 'ok' })
})
