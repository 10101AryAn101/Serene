import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFetchImages } from './hooks/useUnsplash';
import { useAppStore } from './store/appStore';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ImageGallery } from './components/ImageGallery';
import { ActivityFeed } from './components/ActivityFeed';
import { ImageDetailModal } from './components/ImageDetailModal';

// Create QueryClient once
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const AppContent = () => {
  const {
    selectedImageId,
    isModalOpen,
    openModal,
    closeModal,
  } = useAppStore();

  const [page, setPage] = useState(1);
  const [allImages, setAllImages] = useState([]);
  const sentinelRef = useRef(null);

  const { data: images = [], isLoading, error } = useFetchImages(page, 12);

  // Accumulate images when new page data arrives
  useEffect(() => {
    if (images.length > 0) {
      setAllImages((prev) => {
        // Avoid duplicates by checking if images already exist
        const existingIds = new Set(prev.map(img => img.id));
        const newImages = images.filter(img => !existingIds.has(img.id));
        return [...prev, ...newImages];
      });
    }
  }, [images]);

  // Infinite scroll - load more when sentinel comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading && allImages.length > 0) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.1 }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, [isLoading, allImages.length]);

  // Find the selected image from the gallery
  const selectedImage = useMemo(
    () => allImages.find((img) => img.id === selectedImageId),
    [allImages, selectedImageId]
  );

  const handleOpenImage = useCallback((imageId) => {
    openModal(imageId);
  }, [openModal]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-center">
          <p className="text-lg font-semibold text-red-900">
            Failed to load images
          </p>
          <p className="text-red-700 mt-2">
            Please check your Unsplash API key and try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Gallery - Takes 2 columns on large screens */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Image Gallery
              </h2>
              <ImageGallery
                images={allImages}
                isLoading={isLoading && page === 1}
                onOpenImage={handleOpenImage}
              />

              {/* Infinite scroll sentinel */}
              <div
                ref={sentinelRef}
                className="py-8 flex justify-center"
              >
                {isLoading && allImages.length > 0 && (
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                )}
              </div>
            </div>
          </div>

          {/* Activity Feed - Takes 1 column on large screens */}
          <div>
            <Sidebar title="Live Activity">
              <ActivityFeed onImageClick={handleOpenImage} />
            </Sidebar>
          </div>
        </div>
      </main>

      {/* Image Detail Modal */}
      {isModalOpen && selectedImage && (
        <ImageDetailModal
          image={selectedImage}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}
