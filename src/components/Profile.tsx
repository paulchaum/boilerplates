import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Button } from './ui/button'
import { authClient } from '~/lib/auth-client'
import { LogOut, User } from 'lucide-react'

interface ProfileProps {
  user: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

export function Profile({ user }: ProfileProps) {
  const handleSignOut = async () => {
    try {
      await authClient.signOut()
    } catch (error) {
      console.error('Failed to sign out:', error)
    }
  }

  // Generate initials from name or email
  const getInitials = () => {
    if (user.name) {
      return user.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    }
    if (user.email) {
      return user.email[0].toUpperCase()
    }
    return 'U'
  }

  // Generate a consistent color based on user data
  const getUserColor = () => {
    const colors = [
      'bg-red-500',
      'bg-orange-500', 
      'bg-amber-500',
      'bg-yellow-500',
      'bg-lime-500',
      'bg-green-500',
      'bg-emerald-500',
      'bg-teal-500',
      'bg-cyan-500',
      'bg-sky-500',
      'bg-blue-500',
      'bg-indigo-500',
      'bg-violet-500',
      'bg-purple-500',
      'bg-fuchsia-500',
      'bg-pink-500',
      'bg-rose-500'
    ]
    
    const identifier = user.email || user.name || 'default'
    let hash = 0
    for (let i = 0; i < identifier.length; i++) {
      hash = identifier.charCodeAt(i) + ((hash << 5) - hash)
    }
    
    return colors[Math.abs(hash) % colors.length]
  }

  const displayName = user.name || user.email || 'User'

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-8 w-8 rounded-full hover:bg-accent focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200"
        >
          <Avatar className="h-8 w-8 ring-2 ring-background shadow-md">
            <AvatarImage 
              src={user.image || undefined} 
              alt={displayName}
              className="object-cover"
            />
            <AvatarFallback className={`${getUserColor()} text-white font-semibold brightness-90 saturate-75`}>
              {getInitials()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-64 mt-2 shadow-lg border border-border/50 backdrop-blur-sm"
        align="end" 
        forceMount
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{displayName}</p>
            {user.email && (
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {/* Future menu items can be added here */}
        <DropdownMenuItem 
          className="cursor-pointer group hover:bg-destructive/10 focus:bg-destructive/10 transition-colors"
          onClick={handleSignOut}
        >
          <LogOut className="mr-2 h-4 w-4 group-hover:text-destructive transition-colors" />
          <span className="group-hover:text-destructive transition-colors">Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 