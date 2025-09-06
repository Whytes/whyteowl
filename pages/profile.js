import { useSession, getSession } from 'next-auth/react'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

const sidebarCategories = [
  { id: 'general', name: 'General', icon: '👤' },
  { id: 'security', name: 'Security', icon: '🔒' },
  { id: 'theme', name: 'Theme', icon: '🎨' },
  { id: 'notifications', name: 'Notifications', icon: '🔔' },
  { id: 'privacy', name: 'Privacy', icon: '👁️' },
  { id: 'account', name: 'Account', icon: '⚙️' }
]

export default function Profile() {
  const { data: session, status, update } = useSession()
  const router = useRouter()
  const [activeCategory, setActiveCategory] = useState('general')

  // Form states
  const [generalForm, setGeneralForm] = useState({
    name: '',
    email: '',
    bio: ''
  })
  const [securityForm, setSecurityForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  // UI states
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('') // 'success' or 'error'

  // Initialize form data when session loads
  React.useEffect(() => {
    if (session?.user && generalForm.name === '' && generalForm.email === '') {
      setGeneralForm({
        name: session.user.name || '',
        email: session.user.email || '',
        bio: ''
      })
    }
  }, [session?.user?.id]) // Only run when user ID changes (initial load)

  // Redirect if not authenticated
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    )
  }

  if (!session) {
    router.push('/auth/signin')
    return null
  }

  const showMessage = (text, type = 'success') => {
    setMessage(text)
    setMessageType(type)
    setTimeout(() => {
      setMessage('')
      setMessageType('')
    }, 5000)
  }

  const handleGeneralSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Update localStorage immediately for instant UI feedback
    if (typeof window !== 'undefined') {
      localStorage.setItem('userDisplayName', generalForm.name)
    }

    try {
      const response = await fetch('/api/user/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: generalForm.name,
          email: generalForm.email,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        showMessage('Profile updated successfully!')
        // Update the session to reflect changes
        await update({
          ...session,
          user: {
            ...session.user,
            name: generalForm.name,
            email: generalForm.email,
          }
        })
        // Force a session refresh to get latest data from database
        await getSession()
        // Also update localStorage as backup
        if (typeof window !== 'undefined') {
          localStorage.setItem('userDisplayName', generalForm.name)
          // Dispatch custom event to notify Layout component
          window.dispatchEvent(new CustomEvent('userNameChanged', { 
            detail: { name: generalForm.name } 
          }))
        }
        // Don't reset form - keep the current values
      } else {
        showMessage(data.error || 'Failed to update profile', 'error')
      }
    } catch (error) {
      console.error('Error updating profile:', error)
      showMessage('An error occurred while updating your profile', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSecuritySubmit = async (e) => {
    e.preventDefault()

    if (securityForm.newPassword !== securityForm.confirmPassword) {
      showMessage('New passwords do not match', 'error')
      return
    }

    if (securityForm.newPassword.length < 6) {
      showMessage('New password must be at least 6 characters long', 'error')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/user/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword: securityForm.currentPassword,
          newPassword: securityForm.newPassword,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        showMessage('Password updated successfully!')
        setSecurityForm({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        })
      } else {
        showMessage(data.error || 'Failed to update password', 'error')
      }
    } catch (error) {
      console.error('Error updating password:', error)
      showMessage('An error occurred while updating your password', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const renderCategoryContent = () => {
    switch (activeCategory) {
      case 'general':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-textPrimary mb-4">General Settings</h3>
              <p className="text-textSecondary mb-6">Manage your general account preferences</p>
            </div>

            {message && (
              <div className={`p-4 rounded-lg ${messageType === 'error' ? 'bg-red-600/20 border border-red-600' : 'bg-green-600/20 border border-green-600'}`}>
                <p className={`text-sm ${messageType === 'error' ? 'text-red-400' : 'text-green-400'}`}>
                  {message}
                </p>
              </div>
            )}

            <form onSubmit={handleGeneralSubmit} className="bg-gray-800/50 rounded-xl p-6 space-y-4">
              <div>
                <label className="block text-textPrimary font-medium mb-2">Display Name</label>
                <input
                  type="text"
                  value={generalForm.name}
                  onChange={(e) => setGeneralForm({...generalForm, name: e.target.value})}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-textPrimary placeholder-textSecondary focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Enter your display name"
                />
              </div>

              <div>
                <label className="block text-textPrimary font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={generalForm.email}
                  onChange={(e) => setGeneralForm({...generalForm, email: e.target.value})}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-textPrimary placeholder-textSecondary focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-textPrimary font-medium mb-2">Bio</label>
                <textarea
                  rows="4"
                  value={generalForm.bio}
                  onChange={(e) => setGeneralForm({...generalForm, bio: e.target.value})}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-textPrimary placeholder-textSecondary focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Tell us about yourself..."
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-lg border border-green-500"
                >
                  {isLoading ? 'Updating...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        )

      case 'security':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-textPrimary mb-4">Security Settings</h3>
              <p className="text-textSecondary mb-6">Manage your account security and passwords</p>
            </div>

            {message && (
              <div className={`p-4 rounded-lg ${messageType === 'error' ? 'bg-red-600/20 border border-red-600' : 'bg-green-600/20 border border-green-600'}`}>
                <p className={`text-sm ${messageType === 'error' ? 'text-red-400' : 'text-green-400'}`}>
                  {message}
                </p>
              </div>
            )}

            <form onSubmit={handleSecuritySubmit} className="bg-gray-800/50 rounded-xl p-6 space-y-4">
              <div>
                <label className="block text-textPrimary font-medium mb-2">Current Password</label>
                <input
                  type="password"
                  value={securityForm.currentPassword}
                  onChange={(e) => setSecurityForm({...securityForm, currentPassword: e.target.value})}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-textPrimary placeholder-textSecondary focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Enter current password"
                  required
                />
              </div>

              <div>
                <label className="block text-textPrimary font-medium mb-2">New Password</label>
                <input
                  type="password"
                  value={securityForm.newPassword}
                  onChange={(e) => setSecurityForm({...securityForm, newPassword: e.target.value})}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-textPrimary placeholder-textSecondary focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Enter new password"
                  required
                />
              </div>

              <div>
                <label className="block text-textPrimary font-medium mb-2">Confirm New Password</label>
                <input
                  type="password"
                  value={securityForm.confirmPassword}
                  onChange={(e) => setSecurityForm({...securityForm, confirmPassword: e.target.value})}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-textPrimary placeholder-textSecondary focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Confirm new password"
                  required
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-lg border border-green-500"
                >
                  {isLoading ? 'Updating...' : 'Update Password'}
                </button>
              </div>
            </form>
          </div>
        )

      case 'theme':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-textPrimary mb-4">Theme Settings</h3>
              <p className="text-textSecondary mb-6">Customize the appearance of your interface</p>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-6 space-y-4">
              <div>
                <label className="block text-textPrimary font-medium mb-2">Theme Mode</label>
                <select className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-textPrimary focus:outline-none focus:ring-2 focus:ring-accent">
                  <option value="dark">Dark Mode</option>
                  <option value="light">Light Mode</option>
                  <option value="auto">Auto (System)</option>
                </select>
              </div>

              <div>
                <label className="block text-textPrimary font-medium mb-2">Accent Color</label>
                <select className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-textPrimary focus:outline-none focus:ring-2 focus:ring-accent">
                  <option value="blue">Blue</option>
                  <option value="green">Green</option>
                  <option value="purple">Purple</option>
                  <option value="red">Red</option>
                  <option value="orange">Orange</option>
                </select>
              </div>
            </div>
          </div>
        )

      case 'notifications':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-textPrimary mb-4">Notification Settings</h3>
              <p className="text-textSecondary mb-6">Control how and when you receive notifications</p>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-textPrimary font-medium">Email Notifications</label>
                  <p className="text-textSecondary text-sm">Receive notifications via email</p>
                </div>
                <input type="checkbox" className="w-5 h-5" />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-textPrimary font-medium">Push Notifications</label>
                  <p className="text-textSecondary text-sm">Receive push notifications in browser</p>
                </div>
                <input type="checkbox" className="w-5 h-5" />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-textPrimary font-medium">Forum Replies</label>
                  <p className="text-textSecondary text-sm">Get notified when someone replies to your posts</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5" />
              </div>
            </div>
          </div>
        )

      case 'privacy':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-textPrimary mb-4">Privacy Settings</h3>
              <p className="text-textSecondary mb-6">Control your privacy and data sharing preferences</p>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-textPrimary font-medium">Profile Visibility</label>
                  <p className="text-textSecondary text-sm">Make your profile visible to other users</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5" />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-textPrimary font-medium">Show Online Status</label>
                  <p className="text-textSecondary text-sm">Let others see when you're online</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5" />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-textPrimary font-medium">Data Collection</label>
                  <p className="text-textSecondary text-sm">Allow analytics and usage data collection</p>
                </div>
                <input type="checkbox" className="w-5 h-5" />
              </div>
            </div>
          </div>
        )

      case 'account':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-textPrimary mb-4">Account Management</h3>
              <p className="text-textSecondary mb-6">Manage your account settings and data</p>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-6 space-y-4">
              <div className="border border-red-600 rounded-lg p-4">
                <h4 className="text-red-400 font-medium mb-2">Danger Zone</h4>
                <p className="text-textSecondary text-sm mb-4">These actions cannot be undone</p>

                <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        )

      default:
        return <div>Select a category</div>
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-slate-900/95 backdrop-blur-xl border border-border rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex">
          {/* Sidebar */}
          <div className="w-80 bg-gray-800/80 border-r border-border p-6">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-textPrimary mb-2">Settings</h2>
              <p className="text-textSecondary">Manage your account preferences</p>
            </div>

            <nav className="space-y-2">
              {sidebarCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 border ${
                    activeCategory === category.id
                      ? 'bg-accent text-white shadow-lg border-accent'
                      : 'text-textPrimary hover:bg-gray-700/70 hover:text-white border-gray-600 hover:border-gray-500'
                  }`}
                >
                  <span className="text-xl">{category.icon}</span>
                  <span className="font-medium">{category.name}</span>
                </button>
              ))}
            </nav>

            <div className="mt-8 pt-6 border-t border-border">
              <Link
                href="/"
                className="flex items-center space-x-3 px-4 py-3 rounded-lg text-textSecondary hover:bg-gray-700/70 hover:text-white border border-gray-600 hover:border-gray-500 transition-all duration-200"
              >
                <span>←</span>
                <span>Back to Home</span>
              </Link>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-8">
            {renderCategoryContent()}
          </div>
        </div>
      </div>
    </div>
  )
}
