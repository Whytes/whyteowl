import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (session?.user.role === 'ADMIN') {
      fetchAdminStats()
    }
  }, [session])

  const fetchAdminStats = async () => {
    try {
      const response = await fetch('/api/admin/stats')
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Failed to fetch admin stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading') return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  if (!session) return <div className="min-h-screen flex items-center justify-center">Please sign in</div>
  if (session.user.role !== 'ADMIN') return <div className="min-h-screen flex items-center justify-center">Access denied</div>

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-textPrimary mb-8">Admin Dashboard</h1>

        {/* Stats Overview */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-slate-900/95 backdrop-blur-xl border border-border rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-textPrimary">Total Users</h3>
              <p className="text-3xl font-bold text-accent">{stats.stats.totalUsers}</p>
            </div>
            <div className="bg-slate-900/95 backdrop-blur-xl border border-border rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-textPrimary">Active Users</h3>
              <p className="text-3xl font-bold text-green-400">{stats.stats.activeUsers}</p>
            </div>
            <div className="bg-slate-900/95 backdrop-blur-xl border border-border rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-textPrimary">Admin Users</h3>
              <p className="text-3xl font-bold text-yellow-400">{stats.stats.adminUsers}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Users */}
          <div className="bg-slate-900/95 backdrop-blur-xl border border-border rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-textPrimary mb-4">Recent Users</h2>
            {stats?.recentUsers ? (
              <div className="space-y-3">
                {stats.recentUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <div>
                      <p className="text-textPrimary font-medium">{user.name}</p>
                      <p className="text-textSecondary text-sm">{user.email}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-xs px-2 py-1 rounded ${
                        user.role === 'ADMIN' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        {user.role}
                      </p>
                      <p className="text-textSecondary text-xs mt-1">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-textSecondary">Loading users...</p>
            )}
          </div>

          {/* Recent Activity */}
          <div className="bg-slate-900/95 backdrop-blur-xl border border-border rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-textPrimary mb-4">Recent Activity</h2>
            {stats?.recentLogs ? (
              <div className="space-y-3">
                {stats.recentLogs.map((log) => (
                  <div key={log.id} className="p-3 bg-gray-800/50 rounded-lg">
                    <p className="text-textPrimary text-sm">
                      <span className="font-medium">{log.user?.name || 'System'}</span> {log.action.toLowerCase()} {log.entityType.toLowerCase()}
                    </p>
                    <p className="text-textSecondary text-xs">
                      {new Date(log.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-textSecondary">No recent activity</p>
            )}
          </div>
        </div>

        {/* Admin Info */}
        <div className="mt-8 bg-slate-900/95 backdrop-blur-xl border border-border rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-textPrimary mb-4">Admin Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-textSecondary">Name:</p>
              <p className="text-textPrimary font-medium">{session.user.name}</p>
            </div>
            <div>
              <p className="text-textSecondary">Email:</p>
              <p className="text-textPrimary font-medium">{session.user.email}</p>
            </div>
            <div>
              <p className="text-textSecondary">Role:</p>
              <p className="text-accent font-medium">{session.user.role}</p>
            </div>
            <div>
              <p className="text-textSecondary">User ID:</p>
              <p className="text-textPrimary font-mono text-sm">{session.user.id}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
