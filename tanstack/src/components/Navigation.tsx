import { Link } from '@tanstack/react-router'
import { authClient } from '~/lib/auth-client'
import { ThemeToggle } from './theme-toggle'
import { Profile } from './Profile'

export function Navigation() {
  // Use Better Auth's useSession hook to get the current session
  const { data: session, isPending, error } = authClient.useSession()
  
  // Check if user is logged in
  const isLoggedIn = !!session?.user

  if (isPending) {
    return (
      <div className="p-4 flex justify-between items-center border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex gap-6 items-center">
          <Link
            to="/"
            activeProps={{
              className: 'font-bold text-primary',
            }}
            activeOptions={{ exact: true }}
            className="text-lg font-medium hover:text-primary transition-colors"
          >
            Home
          </Link>
        </div>
        
        <div className="flex gap-3 items-center">
          <span className="text-sm text-muted-foreground">Loading...</span>
          <ThemeToggle />
        </div>
      </div>
    )
  }

  if (error) {
    console.error('Session error:', error)
  }

  return (
    <div className="p-4 flex justify-between items-center border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex gap-6 items-center">
        <Link
          to="/"
          activeProps={{
            className: 'font-bold text-primary',
          }}
          activeOptions={{ exact: true }}
          className="text-lg font-medium hover:text-primary transition-colors"
        >
          Home
        </Link>
      </div>
      
      <div className="flex gap-3 items-center">
        {isLoggedIn ? (
          <Profile user={session.user} />
        ) : (
          <Link
            to="/signin"
            activeProps={{
              className: 'font-bold',
            }}
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Sign In
          </Link>
        )}
        <ThemeToggle />
      </div>
    </div>
  )
} 