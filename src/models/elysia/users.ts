import { t, Elysia } from 'elysia'

export const UserModel = new Elysia().model({
  'user.create-body': t.Object({
    email: t.String({
      format: 'email',
      default: '',
    }),
    password: t.RegExp(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,32}$/, {
      default: '',
    }),
  }),
  'user.create-response': t.Object({
    id: t.String(),
    email: t.String({
      format: 'email',
      default: '',
    }),
    createdAt: t.String(),
  }),
})
