enum ErrorCode {
  AlreadyExists = 'already-exists',
}

const MessageMap: Record<ErrorCode, string> = {
  [ErrorCode.AlreadyExists]: 'Object already exists',
}

const HttpCodeMap: Record<ErrorCode, number> = {
  [ErrorCode.AlreadyExists]: 409,
}

interface IAppErrorConstructor {
  code: ErrorCode
  message: string
  httpCode: number
  ctx: any
}

export class AppError extends Error {
  constructor({ code, message, httpCode, ctx }: IAppErrorConstructor) {
    super(message)
    this.code = code
    this.ctx = ctx
    this.message = message
    this.httpCode = httpCode
  }

  static Code = ErrorCode
  public code: ErrorCode
  public ctx: any
  public httpCode: number

  static fromCode(code: ErrorCode, ctx?: any) {
    const message = MessageMap[code]
    const httpCode = HttpCodeMap[code]
    return new AppError({ code, message, httpCode, ctx })
  }
}
