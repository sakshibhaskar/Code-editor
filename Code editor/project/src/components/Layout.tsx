import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { LogOut, Code2, User, Home, Terminal, Settings, Sparkles } from 'lucide-react'

interface LayoutProps {
  children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleSignOut = async () => {
    await signOut()
  }

  const navigationItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/editor', icon: Terminal, label: 'Code Editor' }
  ]

  if (!user) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="bg-white/10 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
                <Code2 className="h-8 w-8 text-indigo-400" />
                <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  CodeArena
                </span>
                <Sparkles className="h-5 w-5 text-yellow-400 animate-pulse" />
              </div>
              
              <div className="hidden md:flex space-x-1">
                {navigationItems.map((item) => {
                  const Icon = item.icon
                  const isActive = location.pathname === item.path
                  
                  return (
                    <button
                      key={item.path}
                      onClick={() => navigate(item.path)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                        isActive
                          ? 'bg-indigo-500/30 text-white border border-indigo-500/50'
                          : 'text-gray-300 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3 px-4 py-2 bg-white/10 rounded-lg border border-white/20">
                <div className="p-2 bg-indigo-500/20 rounded-full">
                  <User className="h-4 w-4 text-indigo-400" />
                </div>
                <div className="hidden sm:block">
                  <p className="text-white font-medium text-sm">
                    {user.user_metadata?.username || user.email?.split('@')[0]}
                  </p>
                  <p className="text-gray-400 text-xs">
                    {user.email}
                  </p>
                </div>
              </div>
              
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30 hover:border-red-500/50 transition-all duration-200"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:block font-medium">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}