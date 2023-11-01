import type { BaseApp } from '../main'
import { randomUUID } from 'crypto'

export const UsersController = (app: BaseApp) =>
  app
    .post(
      '/',
      async ctx => {
        const repo = ctx.store.repository
        const { email, password } = await ctx.body
        const id = randomUUID()
        const dbResponse = await repo.db
          .insert(repo.models.users)
          .values({
            id,
            email,
            password: await ctx.store.PasswordService.hash(password),
            createdAt: new Date().toISOString(),
          })
          .returning()
        const dbo = dbResponse[0]
        const { password: _, ...filtered } = {
          ...dbo,
        }
        return filtered
      },
      {
        body: 'user.create-body',
        response: 'user.create-response',
      }
    )
    .get('/:id', async ctx => {})
    .get('/wip', async ctx => {
      return 'wip'
    })
