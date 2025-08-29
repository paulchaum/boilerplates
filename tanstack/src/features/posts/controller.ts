import { db } from "~/db/drizzle"
import { PostInsert } from "./types"
import { post } from "~/db/schema"
import { eq } from "drizzle-orm"

export const createPost = async (newPost: PostInsert) => {
    return await db.insert(post).values(newPost).returning();
}

export interface GetUserPostsParams {
    userId: string;
}

export const getUserPosts = async (params: GetUserPostsParams) => {
    return await db.select().from(post).where(eq(post.createdByUserId, params.userId));
}