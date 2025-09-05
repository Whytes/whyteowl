import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import LoginModal from '../../components/LoginModal'

export default function TechnicalQuestions() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [createForm, setCreateForm] = useState({
    title: '',
    content: '',
    category: 'technical'
  })

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts?category=technical')
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

  const handleCreatePost = () => {
    if (!session) {
      setShowLoginModal(true)
    } else {
      setShowCreateModal(true)
    }
  }

  const handleSubmitPost = async (e) => {
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
        setCreateForm({ title: '', content: '', category: 'technical' })
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

            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto"></div>
                <p className="text-textSecondary mt-4">Loading posts...</p>
              </div>
            ) : posts.length > 0 ? (
              <div className="space-y-4">
                {posts.map((post) => (
                  <Link key={post.id} href={`/discuss/${post.id}`}>
                    <div className="bg-gray-700/30 rounded-lg p-6 hover:bg-gray-700/50 transition-colors cursor-pointer">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-medium text-accent mb-2 hover:text-accent/80">{post.title}</h3>
                          <p className="text-textSecondary mb-3 line-clamp-3">{post.content}</p>
                          <div className="flex items-center space-x-4 text-sm text-textSecondary">
                            <span>Started by <span className="text-accent">{post.author?.name || 'Anonymous'}</span></span>
                            <span>•</span>
                            <span>{formatDate(post.createdAt)}</span>
                            <span>•</span>
                            <span>{post._count?.comments || 0} comments</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="mt-8 text-center">
                <p className="text-textSecondary mb-4">No technical questions yet. Ask your first question!</p>
                <button
                  onClick={handleCreatePost}
                  className="bg-accent hover:bg-accent/80 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Ask a Question
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Create Post Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-border rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-textPrimary">Ask a Technical Question</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-textSecondary hover:text-textPrimary text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmitPost} className="space-y-6">
              <div>
                <label className="block text-textPrimary font-medium mb-2">Question Title</label>
                <input
                  type="text"
                  value={createForm.title}
                  onChange={(e) => setCreateForm({...createForm, title: e.target.value})}
                  className="w-full bg-gray-800 border border-border rounded-lg px-4 py-3 text-textPrimary focus:outline-none focus:border-accent"
                  placeholder="What's your technical question?"
                  required
                />
              </div>

              <div>
                <label className="block text-textPrimary font-medium mb-2">Details</label>
                <textarea
                  value={createForm.content}
                  onChange={(e) => setCreateForm({...createForm, content: e.target.value})}
                  className="w-full bg-gray-800 border border-border rounded-lg px-4 py-3 text-textPrimary focus:outline-none focus:border-accent h-32 resize-none"
                  placeholder="Provide details about your car, the issue, what you've tried, etc."
                  required
                />
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
                  className="bg-accent hover:bg-accent/80 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Ask Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
