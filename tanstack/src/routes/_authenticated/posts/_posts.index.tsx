import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Skeleton } from "~/components/ui/skeleton";
import { Textarea } from "~/components/ui/textarea";
import { postsQueries, useCreatePost } from "~/features/posts/queries";
import {
	type CreatePostSchema,
	createPostSchema,
} from "~/features/posts/validation";
import { authClient } from "~/lib/auth/auth-client";

export const Route = createFileRoute("/_authenticated/posts/_posts/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { t } = useTranslation();

	const { data: userSession } = authClient.useSession();

	const {
		data: postsResponse,
		isLoading,
		error,
	} = useQuery({
		...postsQueries.list({
			userId: userSession?.user?.id ?? "", // user if is ensured by the "enabled"
		}),
		enabled: !!userSession?.user?.id,
	});

	const form = useForm<CreatePostSchema>({
		resolver: zodResolver(createPostSchema),
		defaultValues: {
			title: "",
			content: "",
		},
	});

	const { mutate: createPost, isPending } = useCreatePost();

	const onSubmit = (data: CreatePostSchema) => {
		createPost(data, {
			onSuccess: () => {
				form.reset();
				toast.success(t("posts.createdSuccess"));
			},
			onError: (error) => {
				toast.error(t("posts.createdError", { error: error.message }));
			},
		});
	};

	return (
		<div className="space-y-8">
			<Card>
				<CardHeader>
					<CardTitle>{t("posts.createTitle")}</CardTitle>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
							<FormField
								control={form.control}
								name="title"
								render={({ field }) => (
									<FormItem className="max-w-sm">
										<FormLabel>{t("posts.title")}</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="content"
								render={({ field }) => (
									<FormItem>
										<FormLabel>{t("posts.content")}</FormLabel>
										<FormControl>
											<Textarea {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button type="submit" disabled={isPending}>
								{isPending ? t("posts.creating") : t("posts.createButton")}
							</Button>
						</form>
					</Form>
				</CardContent>
				<CardFooter></CardFooter>
			</Card>

			{isLoading && (
				<div>
					<h2 className="text-2xl font-bold mb-4">{t("posts.listTitle")}</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{Array.from({ length: 6 }).map((_, index) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: Index is a valid key for skeletons
							<Card key={index}>
								<CardHeader>
									<div className="flex justify-between">
										<Skeleton className="h-6 w-[200px]" />
										<Skeleton className="h-4 w-[80px]" />
									</div>
									<Skeleton className="h-4 w-[150px]" />
								</CardHeader>
								<CardContent>
									<div className="space-y-2">
										<Skeleton className="h-4 w-full" />
										<Skeleton className="h-4 w-[90%]" />
										<Skeleton className="h-4 w-[80%]" />
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			)}
			{error && <div>{t("posts.listError", { error: error.message })}</div>}
			{postsResponse && (
				<div>
					<h2 className="text-2xl font-bold mb-4">{t("posts.listTitle")}</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{postsResponse
							.sort(
								(a, b) =>
									new Date(b.createdAt).getTime() -
									new Date(a.createdAt).getTime(),
							)
							.map((post) => (
								<Card key={post.id}>
									<CardHeader>
										<CardTitle className="flex justify-between">
											<span>{post.title}</span>
											<span className="text-sm text-gray-500">
												{post.createdByUser.name}
											</span>
										</CardTitle>
										<CardDescription>
											{post.createdAt.toLocaleString()}
										</CardDescription>
									</CardHeader>
									<CardContent>
										<p>{post.content}</p>
									</CardContent>
								</Card>
							))}
					</div>
				</div>
			)}
		</div>
	);
}
