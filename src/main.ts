import { Elysia } from 'elysia'
import { HealthController, UsersController } from './controllers'
import { UserModel } from './models'

const createBaseApp = () => {
  return new Elysia().state({ a: 1 }).use(UserModel)
}

export type BaseApp = ReturnType<typeof createBaseApp>

export const createApp = () => {
  return createBaseApp()
    .use(HealthController)
    .group('/api/v1/users', app => app.use(UsersController))
}

export type App = ReturnType<typeof createApp>
