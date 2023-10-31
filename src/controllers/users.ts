import Elysia from 'elysia'
import type { BaseApp } from '../main'

export const UsersController = (app: BaseApp) =>
  app
    .post(
      '/',
      async ctx => {
        console.log('this')
        console.log(ctx.store.a)
      },
      {
        body: 'user.create-body',
      }
    )
    .get('/:id', async ctx => {})
    .get('/wip', async ctx => {
      return 'wip'
    })
