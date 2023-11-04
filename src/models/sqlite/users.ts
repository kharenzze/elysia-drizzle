import { text, sqliteTable, index } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
  id: text('id').notNull().primaryKey(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  createdAt: text('created_at').notNull(),
})

export type User = typeof users.$inferSelect
export type UserData = Omit<User, 'password'>
