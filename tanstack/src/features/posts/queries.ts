import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import { createPostServerFn, getUserPostsServerFn } from "./api";
import { GetUserPostsParams } from "./controller";
import { PostInsert } from "./types";
import { toast } from "sonner";


/**
 * Queries to get posts
 */
export const postsQueries = {
    all: ['posts'],
    lists: () => [...postsQueries.all, 'list'],
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
        mutationFn: (params: Omit<PostInsert, 'createdByUserId'>) => createPostServerFn({ data: params }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: postsQueries.lists() });
        },
    })
}