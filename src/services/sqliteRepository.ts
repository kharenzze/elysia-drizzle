import { drizzle } from 'drizzle-orm/bun-sqlite'
import { migrate } from 'drizzle-orm/bun-sqlite/migrator'
import { Database } from 'bun:sqlite'
import * as models from '../models/sqlite'

export const createSqliteRepository = async (dbPath: string = 'sqlite.db') => {
  const sqlite = new Database(dbPath, {
    create: true,
  })
  const db = drizzle(sqlite, {
    schema: models,
  })
  await migrate(db, { migrationsFolder: './drizzle' })
  return {
    db,
    models,
  }
}
