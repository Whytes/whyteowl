export default function Showcase() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-slate-900/95 backdrop-blur-xl border border-border rounded-2xl p-8 shadow-2xl">
        <h1 className="text-4xl font-bold text-textPrimary mb-6">Showcase</h1>
        <p className="text-textSecondary text-lg mb-8">
          Explore amazing car builds, modifications, and restorations from our community. Get inspired and share your own projects.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-800/50 rounded-xl overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white text-lg font-semibold">Project Image</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-textPrimary mb-2">1967 Mustang GT</h3>
              <p className="text-textSecondary mb-4">Complete restoration with modern performance upgrades</p>
              <div className="flex items-center justify-between">
                <span className="text-accent font-medium">by ClassicResto</span>
                <div className="flex items-center space-x-2">
                  <span className="text-textSecondary text-sm">❤️ 24</span>
                  <span className="text-textSecondary text-sm">💬 8</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-xl overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center">
              <span className="text-white text-lg font-semibold">Project Image</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-textPrimary mb-2">BMW M3 Track Build</h3>
              <p className="text-textSecondary mb-4">Circuit-ready modifications and suspension upgrades</p>
              <div className="flex items-center justify-between">
                <span className="text-accent font-medium">by TrackMaster</span>
                <div className="flex items-center space-x-2">
                  <span className="text-textSecondary text-sm">❤️ 31</span>
                  <span className="text-textSecondary text-sm">💬 12</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-xl overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center">
              <span className="text-white text-lg font-semibold">Project Image</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-textPrimary mb-2">Tesla Model 3 Custom</h3>
              <p className="text-textSecondary mb-4">Unique wrap and interior modifications</p>
              <div className="flex items-center justify-between">
                <span className="text-accent font-medium">by EVCustoms</span>
                <div className="flex items-center space-x-2">
                  <span className="text-textSecondary text-sm">❤️ 18</span>
                  <span className="text-textSecondary text-sm">💬 5</span>
                </div>
              </div>
            </div>
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
