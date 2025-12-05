import { eq } from "drizzle-orm";
import { db } from "~/db/drizzle";
import { post, user } from "~/db/schema";
import type { Post, PostInsert, PostSelect } from "./types";

export const createPost = async (
	newPost: PostInsert,
): Promise<PostSelect | undefined> => {
	const createdPost = await db.insert(post).values(newPost).returning();
	return createdPost?.[0];
};

export interface GetUserPostsParams {
	userId: string;
}

export const getUserPosts = async (
	params: GetUserPostsParams,
): Promise<Post[]> => {
	const posts = await db
		.select()
		.from(post)
		.where(eq(post.createdByUserId, params.userId))
		.innerJoin(user, eq(post.createdByUserId, user.id));

	return posts.map((post) => ({
		...post.post,
		createdByUser: post.user,
	}));
};
