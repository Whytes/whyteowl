import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

const wheelCategories = [
  { name: 'Sport', slug: 'sport' },
  { name: 'High End', slug: 'high-end' },
  { name: 'Tuner', slug: 'tuner' },
  { name: 'Track', slug: 'track' },
  { name: 'SUV', slug: 'suv' },
  { name: 'Street', slug: 'street' },
  { name: 'Off Road', slug: 'off-road' },
  { name: 'Low Rider', slug: 'low-rider' },
  { name: 'Muscle', slug: 'muscle' },
  { name: 'Bike', slug: 'bike' },
  { name: "Benny's OG", slug: 'bennys-og' },
  { name: "Benny's Bespoke", slug: 'bennys-bespoke' },
];

const bodyworkCategories = [
  { name: 'Imports', slug: 'imports' },
];

function Logo({ size = "default" }) {
  const imageSize = size === "large" ? "64" : "48";
  const theTextSize = size === "large" ? "text-3xl" : "text-lg";
  const catalogTextSize = size === "large" ? "text-6xl" : "text-4xl";
  const theLeftPosition = size === "large" ? "left-[39px]" : "left-[22px]";
  
  return (
    <span className="inline-flex items-center mr-2">
      <img src="https://res.cloudinary.com/daim8phol/image/upload/v1757006104/ChatGPT_Image_Sep_4_2025_01_13_59_PM_uuo9df.png" width={imageSize} height={imageSize} className="mr-1" alt="WhyteOwl Logo" />
      <div className="relative flex flex-col items-start">
        <span className={`${theTextSize} font-semibold text-orange-500 leading-tight absolute top-0 ${theLeftPosition} z-10`}>The</span>
        <span className={`font-heading ${catalogTextSize} font-extrabold tracking-wide text-textPrimary leading-tight pt-1`}>Catalog</span>
      </div>
    </span>
  );
}

export { Logo };

export default function Layout({ children }) {
  console.log('Layout component rendered');
  const router = useRouter();
  const currentPath = useMemo(() => router.pathname, [router.pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-30 px-8 py-4 flex items-baseline justify-between relative pointer-events-none">
        <div className="absolute inset-0 bg-surface/80 backdrop-blur-xl shadow-sm border-b border-border pointer-events-auto" style={{clipPath: 'polygon(0 0, 40% 0, 30% 100%, 0 100%)', boxShadow: '2px 0 0 0 white'}}></div>
        <div className="relative z-10 flex items-center space-x-4 pointer-events-auto">
          <Link href="/" className="hover:opacity-90">
            <Logo />
          </Link>
          <nav className="ml-8 flex space-x-6 relative items-baseline mt-3">
            {/* Wheels Dropdown */}
            <div className="relative group pb-3">
              <Link
                href="/wheels"
                className={`font-medium px-3 py-2 rounded-xl transition-all duration-200 hover:bg-accent/10 hover:text-accent text-lg ${currentPath.startsWith('/wheels') ? 'bg-accent/10 text-accent font-bold' : 'text-textPrimary'}`}
              >
                Wheels
              </Link>
              <div className="absolute left-0 mt-2 w-48 bg-gray-800 border border-gray-600 shadow-lg rounded-2xl py-2 z-40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto">
                {wheelCategories.map(cat => (
                  <Link
                    key={cat.slug}
                    href={`/wheels/${cat.slug}`}
                    className="block px-5 py-2 text-textPrimary hover:bg-accent/20 hover:text-accent font-medium transition-all rounded-lg hover:scale-105"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
            {/* Bodywork Dropdown */}
            <div className="relative group pb-3">
              <Link
                href="/bodywork"
                className={`font-medium px-3 py-2 rounded-xl transition-all duration-200 hover:bg-accent/10 hover:text-accent text-lg ${currentPath.startsWith('/bodywork') ? 'bg-accent/10 text-accent font-bold' : 'text-textPrimary'}`}
              >
                Bodywork
              </Link>
              <div className="absolute left-0 mt-2 w-48 bg-gray-800 border border-gray-600 shadow-lg rounded-2xl py-2 z-40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto">
                {bodyworkCategories.map(category => (
                  <Link
                    key={category.slug}
                    href={`/bodywork/${category.slug}`}
                    className="block px-5 py-2 text-textPrimary hover:bg-accent/20 hover:text-accent font-medium transition-all rounded-lg hover:scale-105"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </header>
      <main className="flex-1 w-full px-8 py-8">{children}</main>
      <footer className="bg-surface/80 backdrop-blur-xl text-textSecondary text-center py-6 mt-8 shadow-sm border-t border-border/50">
  {/* Footer removed as requested */}
      </footer>
    </div>
  );
}

// Add fade-in animation for dropdowns
// In your globals.css, add:
// @keyframes fade-in { from { opacity: 0; transform: translateY(10px);} to { opacity: 1; transform: none; } }
// .animate-fade-in { animation: fade-in 0.18s ease; }
