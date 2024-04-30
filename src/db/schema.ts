import { pgEnum, pgTableCreator, serial, text } from 'drizzle-orm/pg-core'

const createTable = pgTableCreator((name) => `proxima_${name}`)

export const statusEnum = pgEnum('proxima_status', [
  'pending',
  'in-progress',
  'done',
])

export const todo = createTable('todo', {
  id: serial('id').primaryKey(),
  text: text('text').notNull(),
  status: statusEnum('status').default('pending').notNull(),
})
