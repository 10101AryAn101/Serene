import React from 'react';
import { useReactionsSubscription } from '../hooks/useInstantDB';

export const ImageCard = ({ image, onOpenDetail }) => {
  // Subscribe to reactions for this specific image
  const { reactions = [] } = useReactionsSubscription(image.id);

  // Group reactions by emoji
  const reactionCounts = {};
  reactions.forEach((reaction) => {
    reactionCounts[reaction.emoji] = (reactionCounts[reaction.emoji] || 0) + 1;
  });

  const topReactions = Object.entries(reactionCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <div
      onClick={() => onOpenDetail(image.id)}
      className="
        group relative bg-white rounded-lg overflow-hidden
        shadow-md hover:shadow-lg transition-shadow duration-300
        cursor-pointer
      "
    >
      {/* Image */}
      <div className="relative overflow-hidden h-48 bg-gray-200">
        <img
          src={image.url}
          alt={image.title}
          loading="lazy"
          className="
            w-full h-full object-cover
            group-hover:scale-105 transition-transform duration-300
          "
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
          {image.title}
        </p>
        <p className="text-xs text-gray-500 mb-3">
          by {image.photographer}
        </p>

        {/* Reactions */}
        {topReactions.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {topReactions.map(([emoji, count]) => (
              <span
                key={emoji}
                className="
                  inline-flex items-center gap-1
                  text-xs font-medium
                  bg-gray-100 rounded px-2 py-1
                "
              >
                {emoji} <span className="text-gray-600">{count}</span>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
