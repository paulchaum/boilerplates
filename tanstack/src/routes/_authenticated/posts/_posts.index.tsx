import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '~/components/ui/card'
import { postsQueries, useCreatePost } from '~/features/posts/queries'
import { createPostSchema, CreatePostSchema } from '~/features/posts/validation'
import { authClient } from '~/lib/auth/auth-client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { Textarea } from '~/components/ui/textarea'

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

  const { mutate: createPost, isPending } = useCreatePost();

  const form = useForm<CreatePostSchema>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  });

  const onSubmit = (data: CreatePostSchema) => {
    createPost(data);
  }

  return (
    <div>
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
      </Card>


      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {postsResponse && <div>Posts: {postsResponse.length}</div>}
    </div>
  )
}
