import { post, user } from "~/db/schema"

export type Post = typeof post.$inferSelect & {
    createdByUser: typeof user.$inferSelect
}

export type PostSelect = typeof post.$inferSelect
export type PostInsert = typeof post.$inferInsert