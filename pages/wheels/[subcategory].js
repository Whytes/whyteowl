import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaCarSide } from 'react-icons/fa';

export default function WheelSubcategory() {
  const router = useRouter();
  const { subcategory } = router.query;
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!subcategory) return;
    setTimeout(() => {
      setImages([
        'https://images.unsplash.com/photo-1511918984145-48de785d4c4e',
        'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d',
        'https://images.unsplash.com/photo-1465101046530-73398c7f28ca',
        'https://images.unsplash.com/photo-1502877338535-766e1452684a',
      ]);
      setLoading(false);
    }, 500);
  }, [subcategory]);

  return (
    <div className="pt-16">
      <nav className="mb-4 text-sm text-metal-dark">
        <Link href="/wheels" className="hover:underline">Wheels</Link> / <span className="capitalize text-primary">{subcategory}</span>
      </nav>
      <h1 className="text-3xl font-heading font-bold mb-8 capitalize text-primary drop-shadow text-center">{subcategory} Wheels</h1>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {[1,2,3,4].map(i => (
            <div key={i} className="bg-white/60 border border-metal shadow-card rounded-2xl h-56 animate-pulse flex items-center justify-center">
              <span className="text-metal-dark text-2xl font-heading">Loading...</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {images.map((img, i) => (
            <div key={i} className="relative bg-white/80 backdrop-blur-xl border border-metal shadow-card rounded-2xl overflow-hidden group transition-all duration-200 hover:scale-105 hover:shadow-xl-glass hover:border-accent">
              <img src={img} alt={`${subcategory} wheel ${i+1}`} className="w-full h-56 object-cover group-hover:opacity-90 transition" />
              <FaCarSide className="absolute top-3 left-3 text-accent text-2xl opacity-80 group-hover:scale-110 transition-transform" />
              <span className="absolute bottom-3 right-3 bg-primary/80 text-metal-light px-3 py-1 rounded-xl text-xs font-heading shadow-card">Image {i+1}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
