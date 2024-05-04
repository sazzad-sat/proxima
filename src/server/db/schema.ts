import {
  integer,
  jsonb,
  pgEnum,
  pgTableCreator,
  serial,
  text,
} from 'drizzle-orm/pg-core'

const createTable = pgTableCreator((name) => `proxima_${name}`)

export const project = createTable('project', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  ownerId: text('ownerId').notNull(),
})

export const statusEnum = pgEnum('proxima_status', [
  'pending',
  'in-progress',
  'done',
])

export const todo = createTable('todo', {
  id: serial('id').primaryKey(),
  text: text('text').notNull(),
  status: statusEnum('status').default('pending').notNull(),
  images: jsonb('images').default([]).notNull(),
  creatorId: text('creatorId').notNull(),
  projectId: integer('projectId').references(() => project.id, {
    onDelete: 'cascade',
  }),
})
