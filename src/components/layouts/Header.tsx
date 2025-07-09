import { Link } from '@tanstack/react-router'
import { authClient } from '~/lib/auth-client'
import { ThemeToggle } from '../theme-toggle'
import { Profile } from '../Profile'
import React from 'react'

interface HeaderLink {
  to: string
  label: string
  icon: React.ReactNode
}

interface HeaderProps {
  children: React.ReactNode
  links: HeaderLink[]
}

export function Header({ children, links }: HeaderProps) {
  // Use Better Auth's useSession hook to get the current session
  const { data: session, isPending, error } = authClient.useSession()
  
  // Check if user is logged in
  const isLoggedIn = !!session?.user

  if (error) {
    console.error('Session error:', error)
  }

  const NavigationLinks = () => (
    <div className="flex items-center space-x-6">
      {links.map((link) => {
        // Clone the icon element and add/merge className if it's a valid React element
        const styledIcon = React.isValidElement(link.icon) 
          ? React.cloneElement(link.icon as React.ReactElement<any>, {
              className: `h-4 w-4 ${(link.icon as React.ReactElement<any>).props?.className || ''}`.trim()
            })
          : link.icon

        return (
          <Link
            key={link.to}
            to={link.to}
            activeProps={{
              className: 'font-bold text-primary',
            }}
            activeOptions={{ exact: true }}
            className="flex items-center gap-2 text-lg font-medium hover:text-primary transition-colors"
          >
            {styledIcon}
            {link.label}
          </Link>
        )
      })}
    </div>
  )

  const UserSection = () => (
    <div className="flex items-center space-x-4">
      {isPending ? (
        <span className="text-sm text-muted-foreground">Loading...</span>
      ) : isLoggedIn ? (
        <Profile user={session.user} />
      ) : (
        <Link
          to="/signin"
          activeProps={{
            className: 'font-bold',
          }}
          className="text-sm font-medium hover:text-primary transition-colors px-4 py-2 rounded-md border border-border hover:bg-accent"
        >
          Sign In
        </Link>
      )}
      <ThemeToggle />
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 w-full items-center justify-between px-6">
          {/* Left side: Logo + Navigation */}
          <div className="flex items-center space-x-8">
            {/* App Logo */}
            <div className="flex items-center gap-3">
              <img src="/favicon.ico" alt="App Logo" className="w-8 h-8" />
              <div className="flex flex-col">
                <span className="font-bold text-lg">App Name</span>
              </div>
            </div>
            
            {/* Navigation Links */}
            <NavigationLinks />
          </div>
          
          {/* Right side: User Section */}
          <UserSection />
        </div>
      </header>
      
      <main className="container mx-auto px-6 py-8 max-w-screen-2xl">
        {children}
      </main>
    </div>
  )
} 