export default function Showcase() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-slate-900/95 backdrop-blur-xl border border-border rounded-2xl p-8 shadow-2xl">
        <h1 className="text-4xl font-bold text-textPrimary mb-6">Showcase</h1>
        <p className="text-textSecondary text-lg mb-8">
          Explore amazing car builds, modifications, and restorations from our community. Get inspired and share your own projects.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-800/50 rounded-xl p-8 text-center">
            <div className="text-6xl mb-4">🚗</div>
            <h3 className="text-xl font-semibold text-textPrimary mb-2">Coming Soon</h3>
            <p className="text-textSecondary">Amazing car builds and modifications from our community will be showcased here.</p>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-8 text-center">
            <div className="text-6xl mb-4">🔧</div>
            <h3 className="text-xl font-semibold text-textPrimary mb-2">Share Your Projects</h3>
            <p className="text-textSecondary">Have a build you're proud of? Upload and share with fellow enthusiasts.</p>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-8 text-center">
            <div className="text-6xl mb-4">🏆</div>
            <h3 className="text-xl font-semibold text-textPrimary mb-2">Community Recognition</h3>
            <p className="text-textSecondary">Get feedback and recognition for your automotive projects.</p>
          </div>
        </div>

        <div className="mt-8 bg-gray-800/50 rounded-xl p-6">
          <h2 className="text-2xl font-semibold text-textPrimary mb-4">Share Your Build</h2>
          <p className="text-textSecondary mb-4">
            Have a project you're proud of? Share it with the community and get feedback from fellow enthusiasts.
          </p>
          <button className="bg-accent hover:bg-accent/80 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            Upload Project
          </button>
        </div>
      </div>
    </div>
  )
}
