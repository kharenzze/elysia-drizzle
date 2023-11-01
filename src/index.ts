import { createApp } from './main'

const app = await createApp({
  sqlitePath: 'sqlite.db',
})

app.listen(3000)

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
