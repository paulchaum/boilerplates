import { z } from "zod";

/**
 * Schema to validate the create post request
 */
export const createPostSchema = z.object({
	title: z.string().min(1),
	content: z.string().min(1),
});

export type CreatePostSchema = z.infer<typeof createPostSchema>;
