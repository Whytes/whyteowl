import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import LoginModal from '../components/LoginModal'

export default function Discuss() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [createForm, setCreateForm] = useState({
    title: '',
    content: '',
    category: 'general'
  })

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts')
      if (response.ok) {
        const data = await response.json()
        setPosts(data)
      }
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStartTopic = () => {
    if (!session) {
      setShowLoginModal(true)
    } else {
      setShowCreateModal(true)
    }
  }

  const handleCreatePost = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(createForm)
      })

      if (response.ok) {
        const newPost = await response.json()
        setPosts([newPost, ...posts])
        setShowCreateModal(false)
        setCreateForm({ title: '', content: '', category: 'general' })
      } else {
        alert('Failed to create post')
      }
    } catch (error) {
      console.error('Error creating post:', error)
      alert('Failed to create post')
    }
  }

  const handleLoginSuccess = () => {
    setShowLoginModal(false)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return 'Just now'
    if (diffDays < 7) return `${diffDays} days ago`
    return date.toLocaleDateString()
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
              {loading ? (
                <div className="text-center py-8">
                  <div className="text-textSecondary">Loading posts...</div>
                </div>
              ) : posts.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">💬</div>
                  <h3 className="text-xl font-medium text-textPrimary mb-2">No posts yet</h3>
                  <p className="text-textSecondary">Be the first to start a discussion!</p>
                </div>
              ) : (
                posts.map((post) => (
                  <div key={post.id} className="bg-gray-700/30 rounded-lg p-6 hover:bg-gray-700/50 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-medium text-accent mb-2 hover:text-accent/80 cursor-pointer">{post.title}</h3>
                        <p className="text-textSecondary mb-3 line-clamp-3">{post.content}</p>
                        <div className="flex items-center space-x-4 text-sm text-textSecondary">
                          <span>Started by <span className="text-accent">{post.author?.name || 'Anonymous'}</span></span>
                          <span>•</span>
                          <span className="capitalize">{post.category}</span>
                          <span>•</span>
                          <span>{formatDate(post.createdAt)}</span>
                        </div>
                      </div>
                      <div className="text-right ml-6">
                        <div className="text-lg font-semibold text-accent">0</div>
                        <div className="text-sm text-textSecondary">replies</div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Create Post Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-border rounded-2xl p-8 w-full max-w-2xl shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-textPrimary">Create New Post</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-textSecondary hover:text-textPrimary text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4">
              <div>
                <label className="block text-textPrimary font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={createForm.title}
                  onChange={(e) => setCreateForm({...createForm, title: e.target.value})}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-textPrimary placeholder-textSecondary focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Enter post title"
                  required
                />
              </div>

              <div>
                <label className="block text-textPrimary font-medium mb-2">Category</label>
                <select
                  value={createForm.category}
                  onChange={(e) => setCreateForm({...createForm, category: e.target.value})}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-textPrimary focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="general">General Discussion</option>
                  <option value="technical">Technical Questions</option>
                </select>
              </div>

              <div>
                <label className="block text-textPrimary font-medium mb-2">Content</label>
                <textarea
                  value={createForm.content}
                  onChange={(e) => setCreateForm({...createForm, content: e.target.value})}
                  rows="6"
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-textPrimary placeholder-textSecondary focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Write your post content here..."
                  required
                ></textarea>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-6 py-3 text-textSecondary hover:text-textPrimary transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors border-2 border-green-400 shadow-lg"
                >
                  Create Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  )
}
