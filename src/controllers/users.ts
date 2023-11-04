import { DrizzleError } from 'drizzle-orm'
import type { BaseApp } from '../main'
import { randomUUID } from 'crypto'
import { AppError } from '../error'

export const UsersController = (app: BaseApp) =>
  app
    .post(
      '/',
      async ctx => {
        const repo = ctx.store.repository
        const { email, password } = await ctx.body
        const id = randomUUID()
        const hashed = await ctx.store.PasswordService.hash(password)
        const dbo = await repo.db
          .insert(repo.models.users)
          .values({
            id,
            email,
            password: hashed,
            createdAt: new Date().toISOString(),
          })
          .returning()
          .then(res => res[0])
          .catch(err => {
            throw AppError.fromCode(AppError.Code.AlreadyExists)
          })
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
