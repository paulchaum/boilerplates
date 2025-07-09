/// <reference types="vite/client" />
import { QueryClient } from '@tanstack/react-query'
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import * as React from 'react'
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary'
import { NotFound } from '~/components/NotFound'
import { Sidebar } from '~/components/layouts/Sidebar'
import { authQueries } from '~/services/queries'
import appCss from '~/styles/app.css?url'
import { seo } from '~/utils/seo'
import { getThemeServerFn } from '~/lib/theme'
import { ThemeProvider, useTheme } from '~/components/theme-provider'
import { HomeIcon, LockIcon } from 'lucide-react'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  beforeLoad: async ({ context }) => {
    const userSession = await context.queryClient.fetchQuery(authQueries.user())

    return { userSession }
  },
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      ...seo({
        title:
          'TanStack Start | Type-Safe, Client-First, Full-Stack React Framework',
        description: `TanStack Start is a type-safe, client-first, full-stack React framework. `,
      }),
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
      { rel: 'icon', href: '/favicon.ico' },
    ],
    scripts: [
      {
        src: '/customScript.js',
        type: 'text/javascript',
      },
    ],
  }),
  loader: () => getThemeServerFn(),
  errorComponent: DefaultCatchBoundary,
  notFoundComponent: () => <NotFound />,
  shellComponent: RootComponent,
});

function RootComponent() {
  const data = Route.useLoaderData();
  return (
    <ThemeProvider theme={data}>
      <RootDocument>
        <Outlet />
      </RootDocument>
    </ThemeProvider>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  const links = [
    { to: '/', label: 'Home', icon: <HomeIcon /> },
    { to: '/protected', label: 'Protected', icon: <LockIcon /> },
  ]

  const LayoutComponent = Sidebar
  
  return (
    <html className={theme} suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <LayoutComponent links={links}>
          {children}
        </LayoutComponent>
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  )
}
