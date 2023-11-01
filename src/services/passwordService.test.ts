import { PasswordService } from './passwordService'
import { describe, it, expect } from 'bun:test'

describe('PasswordService', () => {
  it('should hash and verify passwords', async () => {
    const password = 'password'
    const hash = await PasswordService.hash(password)
    expect(await PasswordService.verify(password, hash)).toBe(true)
  })
})
