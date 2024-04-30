import { integer, pgEnum, pgTableCreator, text } from 'drizzle-orm/pg-core'

const createTable = pgTableCreator((name) => `proxima_${name}`)

const status = pgEnum('prisma_status', ['pending', 'in-progress', 'done'])

export const todo = createTable('todo', {
  id: integer('id').primaryKey(),
  text: text('text').notNull(),
  status: status('status').default('pending').notNull(),
})
