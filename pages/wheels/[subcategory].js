import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { GiCarWheel } from 'react-icons/gi';

export default function WheelSubcategory() {
  const router = useRouter();
  const { subcategory } = router.query;
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!subcategory) return;
    setTimeout(() => {
      // Use custom image for sport wheels
      if (subcategory === 'sport') {
        setImages([
          'https://onslaught.ca/dw/wheels/sport/s/Sport292.jpg',
          'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d',
          'https://images.unsplash.com/photo-1465101046530-73398c7f28ca',
          'https://images.unsplash.com/photo-1502877338535-766e1452684a',
        ]);
      } else {
        setImages([
          'https://images.unsplash.com/photo-1511918984145-48de785d4c4e',
          'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d',
          'https://images.unsplash.com/photo-1465101046530-73398c7f28ca',
          'https://images.unsplash.com/photo-1502877338535-766e1452684a',
        ]);
      }
      setLoading(false);
    }, 500);
  }, [subcategory]);

  const openLightbox = (image, index) => {
    setSelectedImage(image);
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (selectedIndex + 1) % images.length;
    setSelectedImage(images[nextIndex]);
    setSelectedIndex(nextIndex);
  };

  const prevImage = () => {
    const prevIndex = selectedIndex === 0 ? images.length - 1 : selectedIndex - 1;
    setSelectedImage(images[prevIndex]);
    setSelectedIndex(prevIndex);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!selectedImage) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          prevImage();
          break;
        case 'ArrowRight':
          e.preventDefault();
          nextImage();
          break;
        case 'Escape':
          e.preventDefault();
          closeLightbox();
          break;
      }
    };

    if (selectedImage) {
      document.addEventListener('keydown', handleKeyPress);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [selectedImage, selectedIndex, images]);

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
            <div key={i} className="flex flex-col items-center">
              <button 
                onClick={() => openLightbox(img, i)}
                className="bg-white/80 backdrop-blur-xl border border-metal shadow-card rounded-2xl overflow-hidden group transition-all duration-200 hover:scale-105 hover:shadow-xl-glass hover:border-accent cursor-pointer w-full"
              >
                <img src={img} alt={`${subcategory} wheel ${i+1}`} className="w-full h-56 object-cover group-hover:opacity-90 transition" />
              </button>
              <span className="mt-2 text-metal-dark text-xs font-heading">{i+1}</span>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={closeLightbox}>
          <div className="relative max-w-4xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 text-white hover:text-accent transition-all duration-200 text-2xl z-10 hover:scale-110 hover:rotate-90 transform"
            >
              ✕
            </button>

            {/* Navigation buttons */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-accent transition-all duration-200 text-3xl z-10 bg-black/20 hover:bg-black/40 rounded-full w-12 h-12 flex items-center justify-center hover:scale-110 transform"
                >
                  ‹
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-accent transition-all duration-200 text-3xl z-10 bg-black/20 hover:bg-black/40 rounded-full w-12 h-12 flex items-center justify-center hover:scale-110 transform"
                >
                  ›
                </button>
              </>
            )}

            {/* Main image */}
            <img
              src={selectedImage}
              alt={`${subcategory} wheel ${selectedIndex + 1}`}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg shadow-2xl"
            />

            {/* Image counter with arrow */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-3 py-1 rounded-full text-sm relative">
              {selectedIndex + 1} / {images.length}
              {/* Arrow pointing up */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/50"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
