import { Elysia } from 'elysia'
import { HealthController, UsersController } from './controllers'
import { UserModel } from './models/elysia'
import { createSqliteRepository, PasswordService } from './services'
import { randomUUID } from 'crypto'

interface CreationParameters {
  sqlitePath: string
}

const createBaseApp = async (params: CreationParameters) => {
  return new Elysia()
    .state({
      repository: await createSqliteRepository(params.sqlitePath),
      randomUUID,
      PasswordService,
    })
    .use(UserModel)
}

export type BaseApp = Awaited<ReturnType<typeof createBaseApp>>

const attachControllers = (baseApp: BaseApp) =>
  baseApp.use(HealthController).group('/api/v1/users', app => app.use(UsersController))

export type App = ReturnType<typeof attachControllers>

type InParameters = Parameters<typeof createBaseApp>
type TCreateApp = (...args: InParameters) => Promise<App>
export const createApp: TCreateApp = async (...params) => {
  const base = await createBaseApp(...params)
  return attachControllers(base)
}
