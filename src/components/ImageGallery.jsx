import React from 'react';
import { ImageCard } from './ImageCard';

export const ImageGallery = ({ images, isLoading, onOpenImage }) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="py-16 text-center text-gray-500">
        <p className="text-lg">No images found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {images.map((image) => (
        <ImageCard
          key={image.id}
          image={image}
          onOpenDetail={onOpenImage}
        />
      ))}
    </div>
  );
};
