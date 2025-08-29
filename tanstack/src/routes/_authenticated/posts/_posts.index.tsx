import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { postsQueries } from '~/features/posts/queries'
import { authClient } from '~/lib/auth/auth-client'

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
  
  return <div>
    {isLoading && <div>Loading...</div>}
    {error && <div>Error: {error.message}</div>}
    {postsResponse && <div>Posts: {postsResponse.length}</div>}
  </div>
}
