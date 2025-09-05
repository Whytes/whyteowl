export default function Contact() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-slate-900/95 backdrop-blur-xl border border-border rounded-2xl p-8 shadow-2xl">
        <h1 className="text-4xl font-bold text-textPrimary mb-6">Contact Us</h1>
        <p className="text-textSecondary text-lg mb-8">
          Have questions, feedback, or need support? We'd love to hear from you. Get in touch using the form below or reach out through our other channels.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-800/50 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-textPrimary mb-4">Send us a Message</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-textPrimary font-medium mb-2">Name</label>
                <input
                  type="text"
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-textPrimary placeholder-textSecondary focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-textPrimary font-medium mb-2">Email</label>
                <input
                  type="email"
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-textPrimary placeholder-textSecondary focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label className="block text-textPrimary font-medium mb-2">Subject</label>
                <select className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-textPrimary focus:outline-none focus:ring-2 focus:ring-accent">
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="feedback">Feedback</option>
                  <option value="partnership">Partnership</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-textPrimary font-medium mb-2">Message</label>
                <textarea
                  rows="6"
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-textPrimary placeholder-textSecondary focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-accent hover:bg-accent/80 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-800/50 rounded-xl p-6">
              <h2 className="text-2xl font-semibold text-textPrimary mb-4">Other Ways to Reach Us</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-accent/20 w-10 h-10 rounded-full flex items-center justify-center">
                    <span className="text-accent">📧</span>
                  </div>
                  <div>
                    <h3 className="text-textPrimary font-medium">Email</h3>
                    <p className="text-textSecondary">support@whyteowl.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-accent/20 w-10 h-10 rounded-full flex items-center justify-center">
                    <span className="text-accent">💬</span>
                  </div>
                  <div>
                    <h3 className="text-textPrimary font-medium">Community Discord</h3>
                    <p className="text-textSecondary">Join our Discord server</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-accent/20 w-10 h-10 rounded-full flex items-center justify-center">
                    <span className="text-accent">🐦</span>
                  </div>
                  <div>
                    <h3 className="text-textPrimary font-medium">Twitter</h3>
                    <p className="text-textSecondary">@WhyteOwlCars</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-6">
              <h2 className="text-2xl font-semibold text-textPrimary mb-4">FAQ</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-accent font-medium mb-1">How do I reset my password?</h3>
                  <p className="text-textSecondary text-sm">Use the "Forgot Password" link on the sign-in page.</p>
                </div>
                <div>
                  <h3 className="text-accent font-medium mb-1">How do I report a bug?</h3>
                  <p className="text-textSecondary text-sm">Use the contact form above or join our Discord.</p>
                </div>
                <div>
                  <h3 className="text-accent font-medium mb-1">Can I suggest new features?</h3>
                  <p className="text-textSecondary text-sm">Absolutely! Visit our Suggest page to share your ideas.</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-6">
              <h2 className="text-2xl font-semibold text-textPrimary mb-4">Response Times</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-textSecondary">General inquiries</span>
                  <span className="text-textPrimary">24-48 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-textSecondary">Technical support</span>
                  <span className="text-textPrimary">12-24 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-textSecondary">Urgent issues</span>
                  <span className="text-textPrimary">4-8 hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
