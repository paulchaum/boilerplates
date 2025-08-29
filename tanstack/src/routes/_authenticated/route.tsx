import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated')({
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
