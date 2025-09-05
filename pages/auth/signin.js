import { useState } from 'react'
import { signIn, getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function SignIn() {
  const [formData, setFormData] = useState({
    identifier: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await signIn('credentials', {
        identifier: formData.identifier,
        password: formData.password,
        redirect: false
      })

      if (result?.error) {
        setError('Invalid email, username, or password')
      } else {
        router.push('/')
      }
    } catch (error) {
      setError('An error occurred during sign in')
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-start justify-center bg-background pt-20">
      <div className="max-w-md w-full bg-slate-900/95 backdrop-blur-xl border border-border rounded-2xl shadow-2xl p-8 space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-textPrimary">Welcome Back</h2>
          <p className="mt-2 text-textSecondary">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="identifier" className="block text-sm font-medium text-textPrimary">
              Email or Username
            </label>
            <input
              id="identifier"
              type="text"
              required
              value={formData.identifier}
              onChange={(e) => setFormData({...formData, identifier: e.target.value})}
              className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Enter your email or username"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-textPrimary">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Enter your password"
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <div className="bg-surface/60 backdrop-blur-sm border border-border/50 rounded-xl p-2 shadow-lg">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-accent hover:bg-accent/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent disabled:opacity-50 transition-all duration-200"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </div>
        </form>

        <div className="text-center">
          <Link href="/auth/signup" className="text-accent hover:text-accent/80">
            Don't have an account? Sign up
          </Link>
        </div>
      </div>
    </div>
  )
}
