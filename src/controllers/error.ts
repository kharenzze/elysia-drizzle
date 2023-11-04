import Elysia from 'elysia'
import { AppError } from '../error'

export const ErrorController = new Elysia().onError(ctx => {
  if (ctx.error instanceof AppError) {
    const res = new Response()
    ctx.set.status = ctx.error.httpCode
    return {
      code: ctx.error.code,
      message: ctx.error.message,
    }
  }
})
