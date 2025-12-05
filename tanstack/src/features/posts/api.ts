import { createServerFn } from "@tanstack/react-start";
import { authenticatedMiddleware } from "~/lib/middleware/auth";
import {
	createPost,
	type GetUserPostsParams,
	getUserPosts,
} from "./controller";
import type { PostInsert } from "./types";

export const getUserPostsServerFn = createServerFn({ method: "GET" })
	.validator((data: GetUserPostsParams) => data)
	.middleware([authenticatedMiddleware])
	.handler(async ({ context }) => {
		const userId = context.user.id;

		const posts = await getUserPosts({ userId });
		return posts;
	});

export const createPostServerFn = createServerFn({ method: "POST" })
	.validator((data: Omit<PostInsert, "createdByUserId">) => data)
	.middleware([authenticatedMiddleware])
	.handler(async ({ data, context }) => {
		const userId = context.user.id;

		const post = await createPost({ ...data, createdByUserId: userId });
		return post;
	});
