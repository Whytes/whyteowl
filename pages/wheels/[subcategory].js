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
  const [imageLoading, setImageLoading] = useState(false);
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [isZooming, setIsZooming] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchDistance, setTouchDistance] = useState(0);
  const [isPinching, setIsPinching] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [previousImage, setPreviousImage] = useState(null);
  const [gridAnimated, setGridAnimated] = useState(false);
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

  // Trigger grid entrance animations after images load
  useEffect(() => {
    if (!loading && images.length > 0 && !gridAnimated) {
      const timer = setTimeout(() => {
        setGridAnimated(true);
      }, 100); // Small delay to ensure DOM is ready
      return () => clearTimeout(timer);
    }
  }, [loading, images.length, gridAnimated]);

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
      if (!selectedImage) return;

      // Prevent keyboard shortcuts when typing in input fields
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      // Enhanced keyboard shortcuts
      switch (e.key.toLowerCase()) {
        // Arrow keys (existing)
        case 'arrowright':
        case 'd': // WASD navigation
        case 'l': // Vim-style navigation (HJKL)
          e.preventDefault();
          if (zoom <= minZoom && !isTransitioning) nextImage();
          break;
        case 'arrowleft':
        case 'a': // WASD navigation
        case 'h': // Vim-style navigation (HJKL)
          e.preventDefault();
          if (zoom <= minZoom && !isTransitioning) prevImage();
          break;

        // Additional shortcuts
        case ' ': // Space bar for next image
          e.preventDefault();
          if (zoom <= minZoom && !isTransitioning) nextImage();
          break;
        case 'backspace': // Backspace for previous image
          e.preventDefault();
          if (zoom <= minZoom && !isTransitioning) prevImage();
          break;

        // Escape to close modal
        case 'escape':
          e.preventDefault();
          setSelectedImage(null);
          break;

        // Number keys for jumping to specific images (1-9)
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
          e.preventDefault();
          const imageIndex = parseInt(e.key) - 1;
          if (imageIndex < images.length && zoom <= minZoom) {
            setCurrentIndex(imageIndex);
            setSelectedImage(images[imageIndex]);
            setZoom(minZoom);
            setPanX(0);
            setPanY(0);
            preloadNextImages(imageIndex, 3);
          }
          break;

        // Home/End for first/last image
        case 'home':
          e.preventDefault();
          if (zoom <= minZoom && images.length > 0) {
            setCurrentIndex(0);
            setSelectedImage(images[0]);
            setZoom(minZoom);
            setPanX(0);
            setPanY(0);
            preloadNextImages(0, 3);
          }
          break;
        case 'end':
          e.preventDefault();
          if (zoom <= minZoom && images.length > 0) {
            const lastIndex = images.length - 1;
            setCurrentIndex(lastIndex);
            setSelectedImage(images[lastIndex]);
            setZoom(minZoom);
            setPanX(0);
            setPanY(0);
            preloadNextImages(lastIndex, 3);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, currentIndex, zoom, minZoom, images, isTransitioning]);

  const handleWheel = (e) => {
    e.preventDefault();
    if (isZooming) return; // Prevent zoom during transition

    const newZoom = Math.max(minZoom, zoom + e.deltaY * -0.01);
    setZoom(newZoom);
    setIsZooming(true);

    // Reset zooming state after transition completes
    setTimeout(() => setIsZooming(false), 350); // Slightly longer than transition duration

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

    const newPanX = e.clientX - dragStart.x;
    const newPanY = e.clientY - dragStart.y;

    // Calculate pan boundaries to prevent panning beyond image edges
    if (zoom > minZoom && imgRef.current) {
      const imageRect = imgRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Calculate how much the image extends beyond viewport when zoomed
      const imageWidth = imageRect.width * zoom;
      const imageHeight = imageRect.height * zoom;

      // Maximum pan values (half the difference between zoomed image and viewport)
      const maxPanX = Math.max(0, (imageWidth - viewportWidth) / 2);
      const maxPanY = Math.max(0, (imageHeight - viewportHeight) / 2);

      // Clamp pan values to boundaries
      const clampedPanX = Math.max(-maxPanX, Math.min(maxPanX, newPanX));
      const clampedPanY = Math.max(-maxPanY, Math.min(maxPanY, newPanY));

      setPanX(clampedPanX);
      setPanY(clampedPanY);
    } else {
      setPanX(newPanX);
      setPanY(newPanY);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch gesture handlers
  const getTouchDistance = (touch1, touch2) => {
    return Math.sqrt(
      Math.pow(touch2.clientX - touch1.clientX, 2) +
      Math.pow(touch2.clientY - touch1.clientY, 2)
    );
  };

  const getTouchCenter = (touch1, touch2) => {
    return {
      x: (touch1.clientX + touch2.clientX) / 2,
      y: (touch1.clientY + touch2.clientY) / 2
    };
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      // Single touch - prepare for swipe or pan
      const touch = e.touches[0];
      setTouchStart({
        x: touch.clientX,
        y: touch.clientY,
        time: Date.now()
      });
      if (zoom > minZoom) {
        setIsDragging(true);
        setDragStart({ x: touch.clientX - panX, y: touch.clientY - panY });
      }
    } else if (e.touches.length === 2) {
      // Two touches - prepare for pinch zoom
      e.preventDefault();
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = getTouchDistance(touch1, touch2);
      const center = getTouchCenter(touch1, touch2);

      setTouchDistance(distance);
      setTouchStart(center);
      setIsPinching(true);
      setIsDragging(false);
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 1 && isDragging && zoom > minZoom) {
      // Single touch drag
      const touch = e.touches[0];
      const newPanX = touch.clientX - dragStart.x;
      const newPanY = touch.clientY - dragStart.y;

      // Apply pan boundaries
      if (imgRef.current) {
        const imageRect = imgRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        const imageWidth = imageRect.width * zoom;
        const imageHeight = imageRect.height * zoom;

        const maxPanX = Math.max(0, (imageWidth - viewportWidth) / 2);
        const maxPanY = Math.max(0, (imageHeight - viewportHeight) / 2);

        const clampedPanX = Math.max(-maxPanX, Math.min(maxPanX, newPanX));
        const clampedPanY = Math.max(-maxPanY, Math.min(maxPanY, newPanY));

        setPanX(clampedPanX);
        setPanY(clampedPanY);
      }
    } else if (e.touches.length === 2 && isPinching) {
      // Pinch zoom
      e.preventDefault();
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const newDistance = getTouchDistance(touch1, touch2);

      if (touchDistance > 0) {
        const scaleChange = newDistance / touchDistance;
        const newZoom = Math.max(minZoom, zoom * scaleChange);
        setZoom(newZoom);

        if (newZoom <= minZoom) {
          setPanX(0);
          setPanY(0);
        }
      }

      setTouchDistance(newDistance);
    }
  };

  const handleTouchEnd = (e) => {
    setIsDragging(false);
    setIsPinching(false);

    // Check for swipe gesture
    if (touchStart && e.changedTouches.length === 1 && zoom <= minZoom) {
      const touchEnd = e.changedTouches[0];
      const deltaX = touchStart.x - touchEnd.clientX;
      const deltaY = touchStart.y - touchEnd.clientY;
      const deltaTime = Date.now() - touchStart.time;
      const minSwipeDistance = 50;
      const maxSwipeTime = 300;

      // Check if it's a horizontal swipe
      if (Math.abs(deltaX) > minSwipeDistance && Math.abs(deltaY) < 100 && deltaTime < maxSwipeTime) {
        if (deltaX > 0) {
          nextImage(); // Swipe left - next image
        } else {
          prevImage(); // Swipe right - previous image
        }
      }
    }

    setTouchStart(null);
    setTouchDistance(0);
  };

  const nextImage = () => {
    if (zoom > minZoom || isTransitioning) return;
    const nextIndex = (currentIndex + 1) % images.length;
    setPreviousImage(selectedImage);
    setIsTransitioning(true);
    setCurrentIndex(nextIndex);
    setSelectedImage(images[nextIndex]);
    setZoom(minZoom);
    setPanX(0);
    setPanY(0);

    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
      setPreviousImage(null);
    }, 400);

    // Preload next images when navigating
    preloadNextImages(nextIndex, 3);
  };

  const prevImage = () => {
    if (zoom > minZoom || isTransitioning) return;
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setPreviousImage(selectedImage);
    setIsTransitioning(true);
    setCurrentIndex(prevIndex);
    setSelectedImage(images[prevIndex]);
    setZoom(minZoom);
    setPanX(0);
    setPanY(0);

    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
      setPreviousImage(null);
    }, 400);

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

  // Trigger grid entrance animation on mount
  useEffect(() => {
    if (!loading && images.length > 0) {
      setGridAnimated(true);
    }
  }, [loading, images.length]);

  // Trigger text animations on mount
  useEffect(() => {
    if (!loading) {
      // Add a small delay to ensure DOM is ready
      setTimeout(() => {
        const textElements = document.querySelectorAll('.animate-text-reveal, .animate-text-reveal-delayed, .animate-category-label');
        textElements.forEach((el, index) => {
          el.style.animationPlayState = 'running';
        });
      }, 50);
    }
  }, [loading]);

  // Scroll-triggered animations
  useEffect(() => {
    if (loading) return;

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-visible');
        }
      });
    }, observerOptions);

    // Observe wheel cards for scroll animations
    const wheelCards = document.querySelectorAll('.wheel-card');
    wheelCards.forEach((card, index) => {
      // Add staggered animation delays
      card.style.transitionDelay = `${index * 0.02}s`;
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, [loading, images]);

  const getDisplayTitle = (subcategory) => {
    if (!subcategory) return '';
    
    // Special cases for Benny's categories
    if (subcategory === 'bennys-og') {
      return "Benny's OG";
    }
    if (subcategory === 'bennys-bespoke') {
      return "Benny's Bespoke";
    }
    
    // Default formatting for other categories - just the category name
    return subcategory.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="pt-16">
      <div className="text-center mb-12">
        <div className="mb-6">
          <span className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-accent/20 to-accent/10 border border-accent/30 rounded-full text-accent font-bold text-2xl md:text-3xl tracking-wide uppercase animate-category-label">
            {(subcategory || 'loading').replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} Wheels
          </span>
        </div>
      </div>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-2">
          {[1,2,3,4,5,6,7,8,9,10,11,12].map(i => (
            <div key={i} className="bg-white/60 border border-metal shadow-card rounded-2xl h-56 animate-skeleton-pulse flex items-center justify-center overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 animate-skeleton-shimmer"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <GiCarWheel className="text-3xl text-metal-dark animate-pulse" />
              </div>
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
                  className={`wheel-card bg-white/80 backdrop-blur-xl border border-metal shadow-card rounded-2xl overflow-hidden group transition-all duration-200 hover:shadow-card-glow hover:border-accent relative cursor-pointer animate-grid-entrance animate-click-feedback ${gridAnimated ? 'animate-grid-entrance-delayed' : ''}`}
                  style={{ animationDelay: `${i * 0.02}s` }}
                  onClick={() => { 
                    setSelectedImage(img); 
                    setImageLoading(true);
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
                  <span className="absolute top-3 left-3 bg-gradient-to-br from-accent via-accent/90 to-accent/80 text-white px-3 py-1.5 rounded-full text-sm font-black shadow-2xl border-2 border-white/20 backdrop-blur-sm animate-number-badge" style={{textShadow: '0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(0,212,255,0.6)'}}>{imageNumber}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {selectedImage && (
        <div className="fixed inset-0 bg-gradient-to-br from-black/90 via-gray-900/80 to-black/90 backdrop-blur-xl flex items-center justify-center z-50 animate-in fade-in duration-300" onClick={() => setSelectedImage(null)}>
          <div
            className="relative overflow-hidden"
            style={{
              transform: `scale(${zoom}) translate(${panX}px, ${panY}px)`,
              cursor: zoom > minZoom ? (isDragging ? 'grabbing' : 'grab') : 'default',
              transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            {imageLoading && (
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg">
                <div className="flex flex-col items-center space-y-4 bg-white/10 backdrop-blur-sm px-8 py-6 rounded-full border border-white/20">
                  <div className="animate-spin rounded-full h-8 w-8 border-2 border-white/30 border-t-white"></div>
                  <span className="text-white font-medium animate-progress-pulse">Loading...</span>
                  <div className="w-32 h-1 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-accent rounded-full animate-progress-bar"></div>
                  </div>
                </div>
              </div>
            )}

            {/* Previous image during transition */}
            {isTransitioning && previousImage && (
              <img
                src={previousImage}
                alt="Previous wheel"
                className="absolute inset-0 select-none rounded-lg shadow-2xl border border-white/10 animate-fade-out"
                style={{
                  imageRendering: 'crisp-edges',
                  filter: 'brightness(1.02) contrast(1.05)',
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain'
                }}
                draggable="false"
              />
            )}

            {/* Current image */}
            <img
              ref={imgRef}
              src={selectedImage}
              alt="Zoomed wheel"
              className={`select-none rounded-lg shadow-2xl border border-white/10 transition-all duration-300 hover:shadow-3xl ${
                isTransitioning ? 'animate-fade-in' : ''
              }`}
              style={{
                imageRendering: zoom > minZoom ? 'auto' : 'crisp-edges',
                filter: zoom > minZoom ? 'none' : 'brightness(1.02) contrast(1.05)',
                width: '100%',
                height: '100%',
                objectFit: 'contain'
              }}
              width="800"
              height="600"
              onLoad={(e) => {
                setImageLoading(false);
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
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
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

            <span className="absolute top-3 left-3 bg-gradient-to-br from-accent via-accent/90 to-accent/80 text-white px-4 py-2 rounded-full text-xl font-black shadow-2xl border-2 border-white/20 backdrop-blur-sm" style={{textShadow: '0 0 12px rgba(255,255,255,0.9), 0 0 24px rgba(0,212,255,0.7)'}}>
              {parseInt(selectedImage.split('/').pop().match(/\d+/)?.[0] || '0')}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
