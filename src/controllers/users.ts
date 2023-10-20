import Elysia from 'elysia'
import { UserModel } from '../models'

export const UsersController = new Elysia({ prefix: '/users' })
  .use(UserModel)
  .post('/', async ctx => {}, {
    body: 'user.create-body',
  })
  .get('/:id', async ctx => {})
  .get('/wip', async ctx => {
    return 'wip'
  })
