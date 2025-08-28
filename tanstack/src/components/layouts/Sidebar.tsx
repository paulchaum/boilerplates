import { Link } from '@tanstack/react-router'
import { authClient } from '~/lib/auth-client'
import { ThemeToggle } from '../theme-toggle'
import { Profile } from '../Profile'
import React, { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface SidebarLink {
  to: string
  label: string
  icon: React.ReactNode
}

interface SidebarProps {
  children: React.ReactNode
  links: SidebarLink[]
}

export function Sidebar({ children, links }: SidebarProps) {
  // State for sidebar collapse/expand
  const [isCollapsed, setIsCollapsed] = useState(false)
  
  // Use Better Auth's useSession hook to get the current session
  const { data: session, isPending, error } = authClient.useSession()
  
  // Check if user is logged in
  const isLoggedIn = !!session?.user

  if (error) {
    console.error('Session error:', error)
  }

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  const NavigationLinks = () => (
    <div className="flex flex-col space-y-2">
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
              className: 'font-bold text-primary bg-accent',
            }}
            activeOptions={{ exact: true }}
            className={`flex items-center gap-3 text-lg font-medium hover:text-primary hover:bg-accent transition-colors rounded-md px-3 py-2 ${
              isCollapsed ? 'justify-center' : ''
            }`}
            title={isCollapsed ? link.label : undefined}
          >
            {styledIcon}
            {!isCollapsed && link.label}
          </Link>
        )
      })}
    </div>
  )

  const UserSection = () => (
    <div className="mt-auto">
      <hr className="mb-4" />
      <div className={`flex ${isCollapsed ? 'flex-col space-y-2' : 'justify-between'}`}>
        {isPending ? (
          <span className={`text-sm text-muted-foreground ${isCollapsed ? 'text-center' : ''}`}>
            {isCollapsed ? '...' : 'Loading...'}
          </span>
        ) : isLoggedIn ? (
          <div className={isCollapsed ? 'flex justify-center' : ''}>
            <Profile user={session.user} />
          </div>
        ) : (
          <Link
            to="/signin"
            activeProps={{
              className: 'font-bold bg-accent',
            }}
            className={`text-sm font-medium hover:text-primary hover:bg-accent transition-colors px-4 py-2 rounded-md border border-border ${
              isCollapsed ? 'text-center' : ''
            }`}
            title={isCollapsed ? 'Sign In' : undefined}
          >
            {isCollapsed ? '👤' : 'Sign In'}
          </Link>
        )}
        <div className={isCollapsed ? 'flex justify-center' : ''}>
          <ThemeToggle />
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      <aside className={`fixed left-0 top-0 z-40 h-screen border-r border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}>
        <div className={`flex h-full flex-col py-8 ${isCollapsed ? 'px-2' : 'px-6'}`}>
          {/* App Logo */}
          <div className={`mb-6 ${isCollapsed ? 'flex justify-center' : 'flex items-center justify-between'}`}>
            <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
              <img src="/favicon.ico" alt="App Logo" className="w-8 h-8" />
              {!isCollapsed && (
                <div className="flex flex-col">
                  <span className="font-bold text-lg">App Name</span>
                  <span className="text-xs text-muted-foreground">v1.0.0</span>
                </div>
              )}
            </div>
            
            {/* Toggle Button */}
            {!isCollapsed && (
              <button
                onClick={toggleSidebar}
                className="p-1.5 rounded-md hover:bg-accent transition-colors"
                title="Collapse sidebar"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
            )}
          </div>
          
          {/* Collapsed Toggle Button */}
          {isCollapsed && (
            <div className="mb-6 flex justify-center">
              <button
                onClick={toggleSidebar}
                className="p-1.5 rounded-md hover:bg-accent transition-colors"
                title="Expand sidebar"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
          
          <NavigationLinks />
          <UserSection />
        </div>
      </aside>
      <main className={`px-8 py-8 transition-all duration-300 ${
        isCollapsed ? 'ml-16' : 'ml-64'
      }`}>
        {children}
      </main>
    </div>
  )
} 