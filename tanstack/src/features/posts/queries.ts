import {
	queryOptions,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { createPostServerFn, getUserPostsServerFn } from "./api";
import type { GetUserPostsParams } from "./controller";
import type { PostInsert } from "./types";

/**
 * Queries to get posts
 */
export const postsQueries = {
	all: ["posts"],
	lists: () => [...postsQueries.all, "list"],
	list: (params: GetUserPostsParams) =>
		queryOptions({
			queryKey: [...postsQueries.lists(), params],
			queryFn: () => getUserPostsServerFn({ data: params }),
		}),
};

/**
 * Mutation to create a post and invalidate the posts list query
 */
export const useCreatePost = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (params: Omit<PostInsert, "createdByUserId">) =>
			createPostServerFn({ data: params }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: postsQueries.lists() });
		},
	});
};
