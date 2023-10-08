import Elysia from 'elysia'

export const UsersController = new Elysia({ prefix: '/users' })

UsersController.post('/', async ctx => {})

UsersController.get('/:id', async ctx => {})

UsersController.get('/wip', async ctx => {
  return 'wip'
})
