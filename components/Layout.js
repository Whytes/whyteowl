import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useRef } from 'react';

const wheelCategories = [
  { name: 'Tuner', slug: 'tuner' },
  { name: 'Sport', slug: 'sport' },
  { name: 'Street', slug: 'street' },
  { name: 'BennysOG', slug: 'bennysog' },
];

const bodyworkCategories = [
  { name: 'Local', slug: 'local' },
  { name: 'Imports', slug: 'imports' },
];

function Logo() {
  return (
    <span className="inline-flex items-center mr-2">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="mr-1">
        <circle cx="16" cy="16" r="14" fill="#1e293b" stroke="#ff7e1b" strokeWidth="3" />
        <path d="M10 16a6 6 0 1 1 12 0 6 6 0 0 1-12 0zm6-8v4m0 12v-4m8-4h-4m-12 0h4m7.07-7.07l-2.83 2.83m0 8.48l2.83 2.83m8.48-8.48l-2.83 2.83m-8.48-8.48l2.83 2.83" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <span className="font-heading text-2xl font-extrabold tracking-wide text-textPrimary">WhyteOwl</span>
    </span>
  );
}

export default function Layout({ children }) {
  const router = useRouter();
  const [openDropdown, setOpenDropdown] = useState(null);
  const closeTimeout = useRef();

  // Handlers for dropdown with delay
  const handleDropdownEnter = (menu) => {
    clearTimeout(closeTimeout.current);
    setOpenDropdown(menu);
  };
  const handleDropdownLeave = () => {
    closeTimeout.current = setTimeout(() => setOpenDropdown(null), 200);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-30 bg-surfaceElevated shadow-xl-glass px-8 py-4 flex items-center justify-between border-b border-border">
        <div className="flex items-center space-x-4">
          <Link href="/" className="hover:opacity-90">
            <Logo />
          </Link>
          <nav className="ml-8 flex space-x-6 relative">
            {/* Wheels Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleDropdownEnter('wheels')}
              onMouseLeave={handleDropdownLeave}
            >
              <Link
                href="/wheels"
                className={`font-medium px-3 py-2 rounded-xl transition-all duration-200 hover:bg-accent hover:text-textPrimary text-lg ${router.pathname.startsWith('/wheels') ? 'bg-accent text-textPrimary font-bold shadow-card' : 'text-textPrimary'}`}
              >
                Wheels
              </Link>
              {openDropdown === 'wheels' && (
                <div className="absolute left-0 mt-2 w-48 bg-slate-900 border border-slate-700 shadow-xl-glass rounded-xl py-2 z-40 animate-fade-in"
                  onMouseEnter={() => handleDropdownEnter('wheels')}
                  onMouseLeave={handleDropdownLeave}
                >
                  {wheelCategories.map(cat => (
                    <Link
                      key={cat.slug}
                      href={`/wheels/${cat.slug}`}
                      className="block px-5 py-2 text-textPrimary hover:bg-accent hover:text-textPrimary font-medium transition-all rounded-lg"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            {/* Bodywork Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleDropdownEnter('bodywork')}
              onMouseLeave={handleDropdownLeave}
            >
              <Link
                href="/bodywork"
                className={`font-medium px-3 py-2 rounded-xl transition-all duration-200 hover:bg-accent hover:text-textPrimary text-lg ${router.pathname.startsWith('/bodywork') ? 'bg-accent text-textPrimary font-bold shadow-card' : 'text-textPrimary'}`}
              >
                Bodywork
              </Link>
              {openDropdown === 'bodywork' && (
                <div className="absolute left-0 mt-2 w-48 bg-slate-900 border border-slate-700 shadow-xl-glass rounded-xl py-2 z-40 animate-fade-in"
                  onMouseEnter={() => handleDropdownEnter('bodywork')}
                  onMouseLeave={handleDropdownLeave}
                >
                  {bodyworkCategories.map(category => (
                    <Link
                      key={category.slug}
                      href={`/bodywork/${category.slug}`}
                      className="block px-5 py-2 text-textPrimary hover:bg-accent hover:text-textPrimary font-medium transition-all rounded-lg"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>
        </div>
      </header>
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-8">{children}</main>
      <footer className="bg-surfaceElevated text-textSecondary text-center py-6 mt-8 shadow-inner rounded-t-2xl border-t border-border">
        <span className="font-heading text-lg">&copy; {new Date().getFullYear()} WhyteOwl</span>
        <span className="mx-2">|</span>
        <span className="text-sm">Built for car enthusiasts & mechanics. Contact: <a href="mailto:info@whyteowl.com" className="underline hover:text-accent">info@whyteowl.com</a></span>
      </footer>
    </div>
  );
}

// Add fade-in animation for dropdowns
// In your globals.css, add:
// @keyframes fade-in { from { opacity: 0; transform: translateY(10px);} to { opacity: 1; transform: none; } }
// .animate-fade-in { animation: fade-in 0.18s ease; }
