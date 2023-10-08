import { Elysia } from 'elysia'
import { HealthController, UsersController } from './controllers'

const api = new Elysia({
  prefix: '/api/v1',
}).use(UsersController)

export const createApp = () => {
  return new Elysia().use(HealthController).use(api)
}

export type App = ReturnType<typeof createApp>
