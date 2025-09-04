import Link from 'next/link';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { FaCarSide, FaTools } from 'react-icons/fa';

const wheelIcon = <FaCarSide className="text-6xl text-accent mb-6 transition-transform drive-hover" aria-hidden="true" />;
const bodyworkIcon = <FaTools className="text-6xl text-accent mb-6 group-hover:rotate-12 transition-transform" aria-hidden="true" />;

const Home = () => {
  console.log('Home component rendered');

  // Loading state simulation (replace with real data loading if needed)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState([
    {
      href: '/wheels',
      icon: wheelIcon,
      label: 'Wheels',
      ariaLabel: 'Go to Wheels page',
    },
    {
      href: '/bodywork',
      icon: bodyworkIcon,
      label: 'Bodywork',
      ariaLabel: 'Go to Bodywork page',
    },
  ]);

  useEffect(() => {
    console.log('Home useEffect ran');
    // Simulate loading or error if needed
    // setLoading(true);
    // setTimeout(() => setLoading(false), 1000);
    // setError(null); // Or setError('Failed to load')
  }, []);

  return (
    <>
      <Head>
        <title>WhyteOwl | Premium Car Customization</title>
        <meta name="description" content="WhyteOwl - Discover premium wheels and bodywork parts for your vehicle. Quality components for car enthusiasts and mechanics." />
      </Head>
      <Head>
        <title>WhyteOwl | Premium Car Customization</title>
        <meta name="description" content="WhyteOwl - Discover premium wheels and bodywork parts for your vehicle. Quality components for car enthusiasts and mechanics." />
      </Head>
      
      {/* Hero Section */}
      <div className="text-center py-12 px-4">
        <h1 className="text-5xl md:text-6xl font-heading font-black text-textPrimary mb-4 drop-shadow-lg">
          Welcome to <span className="text-accent">WhyteOwl</span>
        </h1>
        <p className="text-xl md:text-2xl text-textSecondary max-w-3xl mx-auto leading-relaxed">
          Elevate your ride with premium wheels and bodywork. Find the perfect parts for your vehicle customization journey.
        </p>
      </div>

      {/* Main Options */}
      <div className="flex flex-col items-center justify-center min-h-[50vh] relative" aria-label="Main home page options">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-32 bg-accent/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-accent/5 rounded-full blur-2xl"></div>
        </div>
        
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <span className="animate-pulse text-xl text-textSecondary">Loading...</span>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : options.length === 0 ? (
          <div className="text-gray-400 text-center">No options available.</div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-8 w-full max-w-4xl justify-center mx-auto relative z-10">
            {options.map((opt, i) => (
              <Link
                key={opt.href}
                href={opt.href}
                className="flex-1 group bg-gradient-to-br from-surface to-surfaceElevated text-textPrimary border border-border/50 shadow-xl-glass rounded-3xl px-8 py-12 flex flex-col items-center justify-center text-center transition-all duration-300 hover:border-accent hover:shadow-2xl hover:shadow-accent/20 hover:scale-105 hover:-translate-y-2 animate-fade-in relative overflow-hidden"
                aria-label={opt.ariaLabel}
                tabIndex={0}
              >
                {/* Card background effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Icon with enhanced styling */}
                <div className="relative z-10 mb-6 p-4 rounded-2xl bg-accent/10 group-hover:bg-accent/20 transition-colors duration-300">
                  {opt.icon}
                </div>
                
                {/* Label with better typography */}
                <span className="text-2xl md:text-3xl font-heading font-bold relative z-10 group-hover:text-accent transition-colors duration-300">
                  {opt.label}
                </span>
                
                {/* Subtle description */}
                <span className="text-sm text-textSecondary mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 relative z-10">
                  {opt.href === '/wheels' ? 'Premium wheel selection' : 'Bodywork & styling parts'}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
