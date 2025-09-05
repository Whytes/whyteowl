import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { GiCarWheel } from 'react-icons/gi';

export default function WheelSubcategory() {
  const router = useRouter();
  const { subcategory } = router.query;
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [minZoom, setMinZoom] = useState(0.5);
  const [currentIndex, setCurrentIndex] = useState(0);
  const imgRef = useRef(null);

  useEffect(() => {
    if (!subcategory) return;

    // Load images from the JSON file
    fetch('/images.json')
      .then(response => response.json())
      .then(allImages => {
        // Map subcategory slugs to folder names in Cloudinary
        const categoryMap = {
          'sport': 'Sport',
          'high-end': 'High End',
          'tuner': 'Tuner',
          'track': 'Track',
          'suv': 'SUV',
          'street': 'Street',
          'off-road': 'Off Road',
          'low-rider': 'Lowrider',
          'muscle': 'Muscle',
          'bike': 'Bike',
          'bennys-og': 'BennysOG',
          'bennys-bespoke': 'Bennys Bespoke'
        };

        const folderName = categoryMap[subcategory] || subcategory;

        // Filter images for this category
        const categoryImages = allImages.filter(url => {
          // URL-decode the URL to handle spaces properly
          const decodedUrl = decodeURIComponent(url);
          return decodedUrl.includes(`/wheel-gallery/${folderName}/`);
        });

        // Sort images numerically by their number (2, 3, 4, 5, 6, 7...)
        const sortedImages = categoryImages.sort((a, b) => {
          const numA = parseInt(a.split('/').pop().match(/\d+/)?.[0] || '0');
          const numB = parseInt(b.split('/').pop().match(/\d+/)?.[0] || '0');
          return numA - numB;
        });

        setImages(sortedImages);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading images:', error);
        setLoading(false);
      });
  }, [subcategory]);

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedImage]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage || zoom > minZoom) return;
      if (e.key === 'ArrowRight') {
        nextImage();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      } else if (e.key === 'Escape') {
        setSelectedImage(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, currentIndex, zoom, minZoom]);

  const handleWheel = (e) => {
    e.preventDefault();
    const newZoom = Math.max(minZoom, Math.min(1, zoom + e.deltaY * -0.01));
    setZoom(newZoom);
    if (newZoom <= minZoom) {
      setPanX(0);
      setPanY(0);
    }
  };

  const handleMouseDown = (e) => {
    if (zoom > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - panX, y: e.clientY - panY });
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPanX(e.clientX - dragStart.x);
    setPanY(e.clientY - dragStart.y);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const nextImage = () => {
    if (zoom > minZoom) return;
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(images[nextIndex]);
    setZoom(1);
    setPanX(0);
    setPanY(0);
  };

  const prevImage = () => {
    if (zoom > minZoom) return;
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(prevIndex);
    setSelectedImage(images[prevIndex]);
    setZoom(1);
    setPanX(0);
    setPanY(0);
  };

  const getDisplayTitle = (subcategory) => {
    if (!subcategory) return '';
    
    // Special cases for Benny's categories
    if (subcategory === 'bennys-og') {
      return "Benny's OG Wheels";
    }
    if (subcategory === 'bennys-bespoke') {
      return "Benny's Bespoke Wheels";
    }
    
    // Default formatting for other categories
    return subcategory.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) + ' Wheels';
  };

  return (
    <div className="pt-16">
      <h1 className="text-5xl font-heading font-bold mb-8 capitalize text-white drop-shadow-lg text-center">{getDisplayTitle(subcategory)}</h1>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="bg-white/60 border border-metal shadow-card rounded-2xl h-56 animate-pulse flex items-center justify-center">
              <span className="text-metal-dark text-2xl font-heading">Loading...</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-2">
          {images.map((img, i) => {
            // Extract image number from filename (e.g., "Sport48.png" -> 48)
            const filename = img.split('/').pop();
            const imageNumber = filename.match(/\d+/) ? parseInt(filename.match(/\d+/)[0]) : i + 2;

            return (
              <div key={i} className="flex flex-col items-center">
                <div className="bg-white/80 backdrop-blur-xl border border-metal shadow-card rounded-2xl overflow-hidden group transition-all duration-200 hover:scale-105 hover:shadow-xl-glass hover:border-accent relative cursor-pointer" onClick={() => { setSelectedImage(img); setZoom(1); setPanX(0); setPanY(0); setCurrentIndex(images.indexOf(img)); }}>
                  <img 
                    src={img} 
                    alt={`${subcategory} wheel ${imageNumber}`} 
                    className="w-full h-56 object-cover group-hover:opacity-90 transition" 
                    loading={i < 6 ? "eager" : "lazy"}
                  />
                  <span className="absolute top-2 left-2 bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800 text-white px-2 py-1 rounded text-sm font-bold shadow-lg border border-gray-500 backdrop-blur-sm" style={{textShadow: '0 0 6px rgba(255,255,255,0.8), 0 0 12px rgba(255,255,255,0.4)'}}>{imageNumber}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50" onClick={() => setSelectedImage(null)}>
          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-6xl font-bold hover:text-gray-300 transition px-4 py-2 rounded"
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
          >
            ‹
          </button>
          <div
            className="relative overflow-auto"
            style={{
              transform: `scale(${zoom}) translate(${panX}px, ${panY}px)`,
              cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
              transition: isDragging ? 'none' : 'transform 0.1s'
            }}
          >
            <img
              ref={imgRef}
              src={selectedImage}
              alt="Zoomed wheel"
              className="select-none"
              onLoad={(e) => {
                const calculatedMinZoom = window.innerHeight / e.target.naturalHeight;
                setMinZoom(calculatedMinZoom);
                setZoom(Math.min(1, calculatedMinZoom));
              }}
              onWheel={handleWheel}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onClick={(e) => {
                e.stopPropagation();
                if (zoom > minZoom) return;
                if (e.clientX > window.innerWidth / 2) {
                  nextImage();
                } else {
                  prevImage();
                }
              }}
              draggable="false"
            />
            <span className="absolute top-2 left-2 bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800 text-white px-4 py-3 rounded-lg text-xl font-bold shadow-2xl border border-gray-500 backdrop-blur-sm" style={{textShadow: '0 0 8px rgba(255,255,255,0.8), 0 0 16px rgba(255,255,255,0.4)'}}>
              {parseInt(selectedImage.split('/').pop().match(/\d+/)?.[0] || '0')}
            </span>
          </div>
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-6xl font-bold hover:text-gray-300 transition px-4 py-2 rounded"
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
          >
            ›
          </button>
          <button className="absolute top-4 right-4 text-white text-5xl font-bold hover:text-gray-300 transition px-4 py-2 rounded" onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}>×</button>
        </div>
      )}
    </div>
  );
}
