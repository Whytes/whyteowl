import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import LoginModal from '../../components/LoginModal'

export default function TechnicalQuestions() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [showLoginModal, setShowLoginModal] = useState(false)

  const handleCreatePost = () => {
    if (!session) {
      setShowLoginModal(true)
    } else {
      // TODO: Open create post modal/form
      alert('Create post functionality coming soon!')
    }
  }

  const handleLoginSuccess = () => {
    setShowLoginModal(false)
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="bg-slate-900/95 backdrop-blur-xl border border-border rounded-2xl p-8 shadow-2xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-textPrimary mb-2">Technical Questions</h1>
            <p className="text-textSecondary text-lg">Get help with car maintenance, repairs, and modifications</p>
          </div>
          <button
            onClick={handleCreatePost}
            className="bg-accent hover:bg-accent/80 text-white px-8 py-4 rounded-lg font-medium transition-colors text-lg"
          >
            Create Post
          </button>
        </div>

        <div className="space-y-6">
          {/* Forum Threads */}
          <div className="bg-gray-800/50 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-textPrimary mb-6">Recent Posts</h2>

            <div className="space-y-4">
              <div className="bg-gray-700/30 rounded-lg p-6 hover:bg-gray-700/50 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-medium text-accent mb-2 hover:text-accent/80 cursor-pointer">Welcome to Technical Questions!</h3>
                    <p className="text-textSecondary mb-3">This section is for technical questions about car maintenance, repairs, modifications, and troubleshooting. Our community of experienced mechanics and enthusiasts are here to help!</p>
                    <div className="flex items-center space-x-4 text-sm text-textSecondary">
                      <span>Started by <span className="text-accent">Admin</span></span>
                      <span>•</span>
                      <span>Just now</span>
                      <span>•</span>
                      <span>0 replies</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-textSecondary mb-4">No technical questions yet. Ask your first question!</p>
              <button
                onClick={handleCreatePost}
                className="bg-accent hover:bg-accent/80 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Ask a Question
              </button>
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
