import { queryOptions } from "@tanstack/react-query";
import { getUserPostsServerFn } from "./api";
import { GetUserPostsParams } from "./controller";

export const postsQueries = {
    all: ['posts'],
    lists: () => [...postsQueries.all, 'list'],
    list: (params: GetUserPostsParams) => 
        queryOptions({
            queryKey: [...postsQueries.lists(), params],
            queryFn: () => getUserPostsServerFn({ data: params }),
        }),
};