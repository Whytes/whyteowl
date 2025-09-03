import Link from 'next/link';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { FaCarSide, FaTools } from 'react-icons/fa';

export default function Home() {
  // Loading state simulation (replace with real data loading if needed)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState([
    {
      href: '/wheels',
      icon: <FaCarSide className="text-6xl text-accent mb-6 group-hover:scale-110 transition-transform" aria-hidden="true" />,
      label: 'Wheels',
      ariaLabel: 'Go to Wheels page',
    },
    {
      href: '/bodywork',
      icon: <FaTools className="text-6xl text-accent mb-6 group-hover:rotate-12 transition-transform" aria-hidden="true" />,
      label: 'Bodywork',
      ariaLabel: 'Go to Bodywork page',
    },
  ]);

  useEffect(() => {
    // Simulate loading or error if needed
    // setLoading(true);
    // setTimeout(() => setLoading(false), 1000);
    // setError(null); // Or setError('Failed to load')
  }, []);

  return (
    <>
      <Head>
        <title>WhyteOwl | Home</title>
        <meta name="description" content="WhyteOwl - Car wheels and bodywork catalog for enthusiasts and mechanics." />
      </Head>
      <div className="flex flex-col items-center justify-center min-h-[70vh]" aria-label="Main home page options">
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <span className="animate-pulse text-xl text-textSecondary">Loading...</span>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : options.length === 0 ? (
          <div className="text-gray-400 text-center">No options available.</div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-10 w-full max-w-2xl justify-center mx-auto">
            {options.map((opt, i) => (
              <Link
                key={opt.href}
                href={opt.href}
                className="flex-1 group bg-surface text-textPrimary border-2 border-border shadow-xl-glass rounded-2xl px-10 py-16 flex flex-col items-center justify-center text-center transition-all duration-200 hover:bg-accent hover:text-textPrimary hover:scale-105 hover:shadow-2xl animate-fade-in"
                aria-label={opt.ariaLabel}
                tabIndex={0}
              >
                {opt.icon}
                <span className="text-3xl font-heading font-bold group-hover:text-textPrimary">{opt.label}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
