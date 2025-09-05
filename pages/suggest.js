export default function Suggest() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-slate-900/95 backdrop-blur-xl border border-border rounded-2xl p-8 shadow-2xl">
        <h1 className="text-4xl font-bold text-textPrimary mb-6">Suggest Features</h1>
        <p className="text-textSecondary text-lg mb-8">
          Help us improve the platform! Share your ideas for new features, improvements, or anything that would make your experience better.
        </p>

        <div className="space-y-6">
          <div className="bg-gray-800/50 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-textPrimary mb-4">Submit a Suggestion</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-textPrimary font-medium mb-2">Title</label>
                <input
                  type="text"
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-textPrimary placeholder-textSecondary focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Brief description of your suggestion"
                />
              </div>
              <div>
                <label className="block text-textPrimary font-medium mb-2">Category</label>
                <select className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-textPrimary focus:outline-none focus:ring-2 focus:ring-accent">
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
                  rows="6"
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-textPrimary placeholder-textSecondary focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Describe your suggestion in detail..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-accent hover:bg-accent/80 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Submit Suggestion
              </button>
            </form>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-textPrimary mb-4">Recent Suggestions</h2>
            <div className="space-y-4">
              <div className="border-b border-gray-600 pb-4">
                <h3 className="text-lg font-medium text-accent mb-1">Add car comparison tool</h3>
                <p className="text-textSecondary text-sm mb-2">Allow users to compare specifications between different cars side by side.</p>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="text-textSecondary">by AutoEnthusiast</span>
                  <span className="text-textSecondary">👍 15 votes</span>
                  <span className="bg-green-600 text-white px-2 py-1 rounded">Under Review</span>
                </div>
              </div>
              <div className="border-b border-gray-600 pb-4">
                <h3 className="text-lg font-medium text-accent mb-1">Mobile app development</h3>
                <p className="text-textSecondary text-sm mb-2">Create a mobile app for easier access on the go.</p>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="text-textSecondary">by MobileUser</span>
                  <span className="text-textSecondary">👍 23 votes</span>
                  <span className="bg-blue-600 text-white px-2 py-1 rounded">Planned</span>
                </div>
              </div>
              <div className="border-b border-gray-600 pb-4">
                <h3 className="text-lg font-medium text-accent mb-1">Advanced search filters</h3>
                <p className="text-textSecondary text-sm mb-2">Add more detailed search options for finding specific car models.</p>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="text-textSecondary">by SearchMaster</span>
                  <span className="text-textSecondary">👍 8 votes</span>
                  <span className="bg-yellow-600 text-white px-2 py-1 rounded">In Progress</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-textPrimary mb-4">How Suggestions Work</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="bg-accent/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-accent text-xl">💡</span>
                </div>
                <h3 className="text-lg font-medium text-textPrimary mb-2">Submit Ideas</h3>
                <p className="text-textSecondary text-sm">Share your feature suggestions with the community</p>
              </div>
              <div className="text-center">
                <div className="bg-accent/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-accent text-xl">👍</span>
                </div>
                <h3 className="text-lg font-medium text-textPrimary mb-2">Community Voting</h3>
                <p className="text-textSecondary text-sm">Other users can vote on suggestions they like</p>
              </div>
              <div className="text-center">
                <div className="bg-accent/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-accent text-xl">🚀</span>
                </div>
                <h3 className="text-lg font-medium text-textPrimary mb-2">Implementation</h3>
                <p className="text-textSecondary text-sm">Popular suggestions get implemented</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
