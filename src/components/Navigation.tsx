'use client'

import { Link } from '@tanstack/react-router'
import { authClient } from '~/lib/auth-client'

export function Navigation() {
  // Use Better Auth's useSession hook to get the current session
  const { data: session, isPending, error } = authClient.useSession()
  
  // Check if user is logged in
  const isLoggedIn = !!session?.user

  if (isPending) {
    return (
      <div className="p-2 flex gap-2 text-lg">
        <Link
          to="/"
          activeProps={{
            className: 'font-bold',
          }}
          activeOptions={{ exact: true }}
        >
          Home
        </Link>
        <span>Loading...</span>
      </div>
    )
  }

  if (error) {
    console.error('Session error:', error)
  }

  return (
    <div className="p-2 flex gap-2 text-lg">
      <Link
        to="/"
        activeProps={{
          className: 'font-bold',
        }}
        activeOptions={{ exact: true }}
      >
        Home
      </Link>{' '}
      {isLoggedIn ? (
        <>
          <span>Welcome, {session.user.name || session.user.email}!</span>
          <button 
            onClick={() => authClient.signOut()}
            className="ml-2 text-blue-600 hover:underline"
          >
            Sign Out
          </button>
        </>
      ) : (
        <Link
          to="/signin"
          activeProps={{
            className: 'font-bold',
          }}
        >
          Sign In
        </Link>
      )}
    </div>
  )
} 