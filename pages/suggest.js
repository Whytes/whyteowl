import { useSession } from 'next-auth/react'
import { useState } from 'react'
import LoginModal from '../components/LoginModal'
import UserName from '../components/UserName'

export default function Suggest() {
  const { data: session, status } = useSession()
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [activeTab, setActiveTab] = useState('suggest')
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!session) {
      setShowLoginModal(true)
      return
    }

    try {
      const response = await fetch('/api/suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        alert('Suggestion submitted successfully!')
        setFormData({
          title: '',
          category: '',
          description: ''
        })
        // Optionally fetch suggestions again to update the list
        if (activeTab === 'view') {
          fetchSuggestions()
        }
      } else {
        alert('Failed to submit suggestion')
      }
    } catch (error) {
      console.error('Error submitting suggestion:', error)
      alert('Failed to submit suggestion')
    }
  }

  const handleLoginSuccess = () => {
    setShowLoginModal(false)
  }

  const fetchSuggestions = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/suggestions')
      if (response.ok) {
        const data = await response.json()
        setSuggestions(data)
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    if (tab === 'view') {
      fetchSuggestions()
    }
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
    <div className="max-w-4xl mx-auto">
      <div className="bg-slate-900/95 backdrop-blur-xl border border-border rounded-2xl p-8 shadow-2xl">
        <h1 className="text-4xl font-bold text-textPrimary mb-6">Feature Suggestions</h1>
        <p className="text-textSecondary text-lg mb-8">
          Help us improve the platform! Share your ideas for new features, improvements, or anything that would make your experience better.
        </p>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 bg-gray-800/30 p-1 rounded-lg">
          <button
            onClick={() => handleTabChange('suggest')}
            className={`flex-1 py-3 px-4 rounded-md font-medium transition-all duration-200 ${
              activeTab === 'suggest'
                ? 'bg-accent text-white shadow-lg'
                : 'text-textSecondary hover:text-textPrimary hover:bg-gray-700/50'
            }`}
          >
            Suggest Features
          </button>
          <button
            onClick={() => handleTabChange('view')}
            className={`flex-1 py-3 px-4 rounded-md font-medium transition-all duration-200 ${
              activeTab === 'view'
                ? 'bg-accent text-white shadow-lg'
                : 'text-textSecondary hover:text-textPrimary hover:bg-gray-700/50'
            }`}
          >
            View Suggestions
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'suggest' && (
          <div className="space-y-6">
            <div className="bg-gray-800/50 rounded-xl p-6">
              <h2 className="text-2xl font-semibold text-textPrimary mb-4">Submit a Suggestion</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-textPrimary font-medium mb-2">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-textPrimary placeholder-textSecondary focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="Brief description of your suggestion"
                    required
                  />
                </div>
                <div>
                  <label className="block text-textPrimary font-medium mb-2">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-textPrimary focus:outline-none focus:ring-2 focus:ring-accent"
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="feature">New Feature</option>
                    <option value="improvement">Improvement</option>
                    <option value="bug">Bug Fix</option>
                    <option value="ui">UI/UX Enhancement</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-textPrimary font-medium mb-2">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="6"
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-textPrimary placeholder-textSecondary focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="Describe your suggestion in detail..."
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors border-2 border-green-400 shadow-lg"
                >
                  Submit Suggestion
                </button>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'view' && (
          <div className="space-y-6">
            <div className="bg-gray-800/50 rounded-xl p-6">
              <h2 className="text-2xl font-semibold text-textPrimary mb-4">Community Suggestions</h2>
              {loading ? (
                <div className="text-center py-8">
                  <div className="text-textSecondary">Loading suggestions...</div>
                </div>
              ) : suggestions.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">�</div>
                  <h3 className="text-xl font-medium text-textPrimary mb-2">No suggestions yet</h3>
                  <p className="text-textSecondary">Be the first to suggest a feature! Switch to the "Suggest Features" tab to get started.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {suggestions.map((suggestion) => (
                    <div key={suggestion.id} className="border-b border-gray-600 pb-4 last:border-b-0">
                      <h3 className="text-lg font-medium text-accent mb-1">{suggestion.title}</h3>
                      <p className="text-textSecondary text-sm mb-2">{suggestion.description}</p>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="text-textSecondary">by <UserName user={suggestion.author} /></span>
                        <span className="text-textSecondary">•</span>
                        <span className="capitalize">{suggestion.category}</span>
                        <span className="text-textSecondary">•</span>
                        <span className="text-textSecondary">{formatDate(suggestion.createdAt)}</span>
                        <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">Published</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  )
}
