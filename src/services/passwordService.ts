export const PasswordService = {
  hash: (password: string) => {
    return Bun.password.hash(password, {
      algorithm: 'argon2id',
      memoryCost: 16,
      timeCost: 16,
    })
  },
  verify: (password: string, hash: string) => {
    return Bun.password.verify(password, hash)
  },
}
