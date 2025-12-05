import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { user } from "~/db/auth-schema";

export {
	account,
	session,
	user,
	verification,
} from "~/db/auth-schema";

export const post = pgTable("post", {
	id: uuid("uuid1").defaultRandom().primaryKey(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),

	title: text("title").notNull(),
	content: text("content").notNull(),
	createdByUserId: text("created_by_user_id")
		.references(() => user.id)
		.notNull(),
});

export const postRelations = relations(post, ({ one }) => ({
	createdByUser: one(user, {
		fields: [post.createdByUserId],
		references: [user.id],
	}),
}));
