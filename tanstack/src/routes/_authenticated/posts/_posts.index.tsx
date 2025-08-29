import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card'
import { Skeleton } from '~/components/ui/skeleton'
import { postsQueries, useCreatePost } from '~/features/posts/queries'
import { createPostSchema, CreatePostSchema } from '~/features/posts/validation'
import { authClient } from '~/lib/auth/auth-client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { Textarea } from '~/components/ui/textarea'
import { toast } from 'sonner'

export const Route = createFileRoute('/_authenticated/posts/_posts/')({
  component: RouteComponent,
})

function RouteComponent() {

  const { data: userSession } = authClient.useSession();

  const { data: postsResponse, isLoading, error } = useQuery(
    postsQueries.list({
      userId: userSession?.user?.id!,
    })
  )

  const form = useForm<CreatePostSchema>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  });

  const {
    mutate: createPost,
    isPending,
    error: createPostError,
  } = useCreatePost();

  const onSubmit = (data: CreatePostSchema) => {
    createPost(data, {
      onSuccess: () => {
        form.reset();
        toast.success('Post created successfully!');
      },
      onError: (error) => {
        toast.error(`Failed to create post: ${error.message}`);
      }
    });
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Create Post</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="max-w-sm">
                    <FormLabel>Title</FormLabel>
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
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isPending}>
                {isPending ? 'Creating...' : 'Create Post'}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>

        </CardFooter>
      </Card>


      {isLoading && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
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
      {error && <div>Error: {error.message}</div>}
      {postsResponse && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {postsResponse
              .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
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
  )
}
