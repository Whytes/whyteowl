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
  const [loadedImages, setLoadedImages] = useState(new Set());
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
    const newZoom = Math.max(minZoom, zoom + e.deltaY * -0.01);
    setZoom(newZoom);
    if (newZoom <= minZoom) {
      setPanX(0);
      setPanY(0);
    }
  };

  const handleMouseDown = (e) => {
    if (zoom > minZoom) {
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
    setZoom(minZoom); // Use minZoom (fullscreen) instead of 1
    setPanX(0);
    setPanY(0);
    // Preload next images when navigating
    preloadNextImages(nextIndex, 3);
  };

  const prevImage = () => {
    if (zoom > minZoom) return;
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(prevIndex);
    setSelectedImage(images[prevIndex]);
    setZoom(minZoom); // Use minZoom (fullscreen) instead of 1
    setPanX(0);
    setPanY(0);
    // Preload next images when navigating
    preloadNextImages(prevIndex, 3);
  };

  const handleImageLoad = (imageUrl) => {
    setLoadedImages(prev => new Set([...prev, imageUrl]));
  };

  const preloadImage = (imageUrl) => {
    if (!imageUrl || loadedImages.has(imageUrl)) return;
    
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => handleImageLoad(imageUrl);
  };

  const preloadNextImages = (currentIndex, count = 3) => {
    for (let i = 1; i <= count; i++) {
      const nextIndex = (currentIndex + i) % images.length;
      if (images[nextIndex]) {
        preloadImage(images[nextIndex]);
      }
    }
  };

  const handleImageHover = (imageIndex) => {
    // Preload the next 2-3 images when hovering
    preloadNextImages(imageIndex, 2);
  };

  // Scroll-based preloading using Intersection Observer
  useEffect(() => {
    if (!images.length) return;

    const observerOptions = {
      root: null,
      rootMargin: '50px', // Start loading 50px before image comes into view
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const imageUrl = img.src;
          if (!loadedImages.has(imageUrl)) {
            preloadImage(imageUrl);
          }
        }
      });
    }, observerOptions);

    // Observe all images after a short delay to ensure they're rendered
    const timeoutId = setTimeout(() => {
      const imageElements = document.querySelectorAll('.wheel-image');
      imageElements.forEach((img) => observer.observe(img));
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [images, loadedImages]);

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
                <div 
                  className="bg-white/80 backdrop-blur-xl border border-metal shadow-card rounded-2xl overflow-hidden group transition-all duration-200 hover:scale-105 hover:shadow-xl-glass hover:border-accent relative cursor-pointer" 
                  onClick={() => { 
                    setSelectedImage(img); 
                    setZoom(1); // This will be overridden by onLoad, but set a default
                    setPanX(0); 
                    setPanY(0); 
                    setCurrentIndex(images.indexOf(img));
                    // Preload adjacent images when modal opens
                    preloadNextImages(images.indexOf(img), 4);
                  }}
                  onMouseEnter={() => handleImageHover(images.indexOf(img))}
                >
                  {/* Loading Placeholder */}
                  {!loadedImages.has(img) && (
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-shimmer flex items-center justify-center">
                      <GiCarWheel className="text-3xl text-metal-dark" />
                    </div>
                  )}
                  
                  {/* Actual Image */}
                  <img 
                    src={img} 
                    alt={`${subcategory} wheel ${imageNumber}`} 
                    className={`wheel-image w-full h-56 object-cover group-hover:opacity-90 transition-opacity duration-300 ${loadedImages.has(img) ? 'opacity-100' : 'opacity-0'}`}
                    loading={i < 6 ? "eager" : "lazy"}
                    width="224"
                    height="224"
                    onLoad={() => handleImageLoad(img)}
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
              cursor: zoom > minZoom ? (isDragging ? 'grabbing' : 'grab') : 'default',
              transition: isDragging ? 'none' : 'transform 0.1s'
            }}
          >
            <img
              ref={imgRef}
              src={selectedImage}
              alt="Zoomed wheel"
              className="select-none"
              width="800"
              height="600"
              onLoad={(e) => {
                // Calculate zoom to fit both width and height (fullscreen) ensuring entire image is visible
                // Account for browser UI elements like Firefox hotbar
                const browserUISpace = 120; // Extra space for browser toolbar, address bar, etc.
                const buttonSpace = 60; // Space for navigation buttons
                const labelSpace = 40; // Space for the number label at top

                // Available space accounting for all UI elements
                const availableWidth = window.innerWidth - buttonSpace;
                const availableHeight = window.innerHeight - browserUISpace - labelSpace;

                // Use the displayed dimensions (800x600) for calculation
                const displayWidth = 800;
                const displayHeight = 600;

                const heightRatio = availableHeight / displayHeight;
                const widthRatio = availableWidth / displayWidth;
                const fullscreenZoom = Math.min(heightRatio, widthRatio);

                setMinZoom(fullscreenZoom);
                setZoom(fullscreenZoom);
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
