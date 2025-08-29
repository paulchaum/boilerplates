import { createServerFn } from "@tanstack/react-start";
import {  getUserPosts, GetUserPostsParams } from "./controller";
import { authenticatedMiddleware } from "~/lib/middleware/auth";

export const getUserPostsServerFn = createServerFn({ method: "GET" })
    .validator((data: GetUserPostsParams) => data)
    .middleware([authenticatedMiddleware])
    .handler(async ({ data, context }) => {
        const userId = context.user.id;

        const posts = await getUserPosts({ userId });
        return posts;
    });