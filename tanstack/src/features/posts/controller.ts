import { db } from "~/db/drizzle"
import { PostInsert } from "./types"
import { post } from "~/db/schema"
import { eq } from "drizzle-orm"

export const createPost = async (newPost: PostInsert) => {
    return await db.insert(post).values(newPost).returning();
}

export const getUserPosts = async (userId: string) => {
    return await db.select().from(post).where(eq(post.createdByUserId, userId));
}