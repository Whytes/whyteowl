import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import LoginModal from '../../components/LoginModal'
import UserName from '../../components/UserName'

export default function AllDiscussions() {
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

  const handleCreatePost = () => {
    if (!session) {
      setShowLoginModal(true)
    } else {
      setShowCreateModal(true)
    }
  }

  const handleSubmitPost = async (e) => {
    e.preventDefault()
    console.log('[DISCUSS PAGE] Starting post submission')
    console.log('[DISCUSS PAGE] Form data:', createForm)

    try {
      console.log('[DISCUSS PAGE] Making API request to /api/posts')
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(createForm)
      })

      console.log('[DISCUSS PAGE] API response status:', response.status)
      console.log('[DISCUSS PAGE] API response headers:', Object.fromEntries(response.headers.entries()))

      if (response.ok) {
        const newPost = await response.json()
        console.log('[DISCUSS PAGE] Post created successfully:', newPost)
        setPosts([newPost, ...posts])
        setShowCreateModal(false)
        setCreateForm({ title: '', content: '', category: 'general' })
      } else {
        const errorText = await response.text()
        console.log('[DISCUSS PAGE] API error response:', errorText)
        alert('Failed to create post')
      }
    } catch (error) {
      console.error('[DISCUSS PAGE] Network error:', error)
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

  const getCategoryColor = (category) => {
    switch (category) {
      case 'general': return 'bg-blue-500'
      case 'technical': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  const formatCategory = (category) => {
    return category.charAt(0).toUpperCase() + category.slice(1)
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="bg-slate-900/95 backdrop-blur-xl border border-border rounded-2xl p-8 shadow-2xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-textPrimary mb-2">All Discussions</h1>
            <p className="text-textSecondary text-lg">Browse all forum posts and discussions</p>
          </div>
          <button
            onClick={handleCreatePost}
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-medium transition-colors text-lg border-2 border-green-400 shadow-lg"
          >
            Create Post
          </button>
        </div>

        {/* Category Links */}
        <div className="flex space-x-4 mb-8">
          <Link href="/discuss/general" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
            General
          </Link>
          <Link href="/discuss/technical" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors">
            Technical
          </Link>
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
                {posts.map((post, index) => (
                  <div key={post.id}>
                    <Link href={`/discuss/${post.id}`}>
                      <div className="bg-gray-700/30 rounded-lg p-6 hover:bg-gray-700/50 transition-colors cursor-pointer">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className={`px-2 py-1 rounded text-xs text-white ${getCategoryColor(post.category)}`}>
                                {formatCategory(post.category)}
                              </span>
                              <h3 className="text-xl font-medium text-accent hover:text-accent/80">{post.title}</h3>
                            </div>
                            <p className="text-textSecondary mb-3 line-clamp-3">{post.content}</p>
                            <div className="flex items-center space-x-4 text-sm text-textSecondary">
                              <span>Started by <UserName user={post.author} /></span>
                              <span>•</span>
                              <span>{formatDate(post.createdAt)}</span>
                              <span>•</span>
                              <span>{post._count?.comments || 0} comments</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                    {index < posts.length - 1 && <hr className="border-gray-600 my-4" />}
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-8 text-center">
                <p className="text-textSecondary mb-4">No posts yet. Be the first to start a discussion!</p>
                <button
                  onClick={handleCreatePost}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors border-2 border-green-400 shadow-lg"
                >
                  Create First Post
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
              <h2 className="text-2xl font-bold text-textPrimary">Create New Post</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-textSecondary hover:text-textPrimary text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmitPost} className="space-y-6">
              <div>
                <label className="block text-textPrimary font-medium mb-2">Category</label>
                <select
                  value={createForm.category}
                  onChange={(e) => setCreateForm({...createForm, category: e.target.value})}
                  className="w-full bg-gray-800 border border-border rounded-lg px-4 py-3 text-textPrimary focus:outline-none focus:border-accent"
                >
                  <option value="general">General Discussion</option>
                  <option value="technical">Technical Discussion</option>
                </select>
              </div>

              <div>
                <label className="block text-textPrimary font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={createForm.title}
                  onChange={(e) => setCreateForm({...createForm, title: e.target.value})}
                  className="w-full bg-gray-800 border border-border rounded-lg px-4 py-3 text-textPrimary focus:outline-none focus:border-accent"
                  placeholder="Enter post title..."
                  required
                />
              </div>

              <div>
                <label className="block text-textPrimary font-medium mb-2">Content</label>
                <textarea
                  value={createForm.content}
                  onChange={(e) => setCreateForm({...createForm, content: e.target.value})}
                  className="w-full bg-gray-800 border border-border rounded-lg px-4 py-3 text-textPrimary focus:outline-none focus:border-accent h-32 resize-none"
                  placeholder="Share your thoughts..."
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
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors border-2 border-green-400 shadow-lg"
                >
                  Create Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
