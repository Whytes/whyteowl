import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import LoginModal from '../../components/LoginModal'

export default function PostDetail() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { id } = router.query
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showCommentModal, setShowCommentModal] = useState(false)
  const [commentForm, setCommentForm] = useState({
    content: ''
  })

  useEffect(() => {
    if (id) {
      fetchPost()
    }
  }, [id])

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/posts/${id}`)
      if (response.ok) {
        const data = await response.json()
        setPost(data)
        setComments(data.comments || [])
      } else {
        console.error('Failed to fetch post')
      }
    } catch (error) {
      console.error('Error fetching post:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddComment = () => {
    if (!session) {
      setShowLoginModal(true)
    } else {
      setShowCommentModal(true)
    }
  }

  const handleSubmitComment = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content: commentForm.content,
          postId: id
        })
      })

      if (response.ok) {
        const newComment = await response.json()
        setComments([...comments, newComment])
        setShowCommentModal(false)
        setCommentForm({ content: '' })
      } else {
        alert('Failed to add comment')
      }
    } catch (error) {
      console.error('Error adding comment:', error)
      alert('Failed to add comment')
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-textPrimary mb-4">Post not found</h1>
          <Link href="/discuss" className="text-accent hover:underline">
            Back to discussions
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-slate-900/95 backdrop-blur-xl border border-border rounded-2xl p-8 shadow-2xl">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href={`/discuss/${post.category}`}
            className="text-accent hover:text-accent/80 flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to {post.category} discussions</span>
          </Link>
        </div>

        {/* Post Content */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-textPrimary mb-4">{post.title}</h1>
          <div className="flex items-center space-x-4 text-sm text-textSecondary mb-6">
            <span>Posted by <span className="text-accent">{post.author?.name || 'Anonymous'}</span></span>
            <span>•</span>
            <span>{formatDate(post.createdAt)}</span>
            <span>•</span>
            <span>{comments.length} comments</span>
          </div>
          <div className="text-textPrimary whitespace-pre-wrap">{post.content}</div>
        </div>

        {/* Add Comment Button */}
        <div className="mb-6">
          <button
            onClick={handleAddComment}
            className="bg-accent hover:bg-accent/80 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Add Comment
          </button>
        </div>

        {/* Comments Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-textPrimary">Comments ({comments.length})</h2>

          {comments.length > 0 ? (
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="bg-gray-800/50 rounded-lg p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-accent font-medium">{comment.author?.name || 'Anonymous'}</span>
                        <span className="text-textSecondary text-sm">{formatDate(comment.createdAt)}</span>
                      </div>
                      <p className="text-textPrimary">{comment.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-textSecondary mb-4">No comments yet. Be the first to comment!</p>
            </div>
          )}
        </div>
      </div>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Comment Modal */}
      {showCommentModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-border rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-textPrimary">Add Comment</h2>
              <button
                onClick={() => setShowCommentModal(false)}
                className="text-textSecondary hover:text-textPrimary text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmitComment} className="space-y-6">
              <div>
                <label className="block text-textPrimary font-medium mb-2">Comment</label>
                <textarea
                  value={commentForm.content}
                  onChange={(e) => setCommentForm({...commentForm, content: e.target.value})}
                  className="w-full bg-gray-800 border border-border rounded-lg px-4 py-3 text-textPrimary focus:outline-none focus:border-accent h-32 resize-none"
                  placeholder="Share your thoughts..."
                  required
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowCommentModal(false)}
                  className="px-6 py-3 text-textSecondary hover:text-textPrimary transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-accent hover:bg-accent/80 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Post Comment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
