import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/protected')({
  component: RouteComponent,
  beforeLoad: async ({ context, location }) => {
    if (!context.userSession) {
      throw redirect({
        to: "/signin",
        search: {
          redirectTo: location.href,
        },
      });
    }
  },
})

function RouteComponent() {
  return <div>Hello "/protected"!</div>
}
