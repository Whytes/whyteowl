import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import LoginModal from '../components/LoginModal'

export default function Discuss() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [showLoginModal, setShowLoginModal] = useState(false)

  const handleStartTopic = () => {
    if (!session) {
      setShowLoginModal(true)
    } else {
      // TODO: Open create topic modal/form
      alert('Create topic functionality coming soon!')
    }
  }

  const handleLoginSuccess = () => {
    setShowLoginModal(false)
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="bg-slate-900/95 backdrop-blur-xl border border-border rounded-2xl p-8 shadow-2xl">
        <h1 className="text-5xl font-bold text-textPrimary mb-8 text-center">Community Forum</h1>
        <p className="text-textSecondary text-xl mb-12 text-center max-w-3xl mx-auto">
          Join the conversation with fellow car enthusiasts. Share your thoughts, ask questions, and connect with the community.
        </p>

        <div className="space-y-8">
          {/* Forum Categories */}
          <div className="bg-gray-800/50 rounded-xl p-8">
            <h2 className="text-3xl font-semibold text-textPrimary mb-6">Forum Categories</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Link href="/discuss/general">
                <div className="bg-gray-700/50 rounded-lg p-6 hover:bg-gray-700/70 transition-colors cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-medium text-accent mb-2">General Discussion</h3>
                      <p className="text-textSecondary">Talk about anything car-related with fellow enthusiasts</p>
                    </div>
                  </div>
                </div>
              </Link>

              <Link href="/discuss/technical">
                <div className="bg-gray-700/50 rounded-lg p-6 hover:bg-gray-700/70 transition-colors cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-medium text-accent mb-2">Technical Questions</h3>
                      <p className="text-textSecondary">Get help with car maintenance, repairs, and modifications</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Recent Discussions */}
          <div className="bg-gray-800/50 rounded-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-semibold text-textPrimary">Recent Discussions</h2>
              <button
                onClick={handleStartTopic}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors border-2 border-green-400 shadow-lg"
              >
                Create Post
              </button>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-700/30 rounded-lg p-6 hover:bg-gray-700/50 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-medium text-accent mb-2 hover:text-accent/80 cursor-pointer">Welcome to the Community Forum!</h3>
                    <p className="text-textSecondary mb-3">Welcome to our new community forum! This is the place to discuss all things automotive with fellow enthusiasts. Feel free to introduce yourself and start conversations about cars, maintenance, modifications, and more.</p>
                    <div className="flex items-center space-x-4 text-sm text-textSecondary">
                      <span>Started by <span className="text-accent">Admin</span></span>
                      <span>•</span>
                      <span>General Discussion</span>
                      <span>•</span>
                      <span>Just now</span>
                    </div>
                  </div>
                  <div className="text-right ml-6">
                    <div className="text-lg font-semibold text-accent">0</div>
                    <div className="text-sm text-textSecondary">replies</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  )
}
