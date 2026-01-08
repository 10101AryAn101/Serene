import React, { useCallback } from 'react';
import { useActivityFeedSubscription } from '../hooks/useInstantDB';

export const ActivityFeed = ({ onImageClick }) => {
  const { activityFeed, isLoading } = useActivityFeedSubscription();

  const getActivityMessage = useCallback((item) => {
    const baseMessage = (
      <>
        <span
          className="font-semibold inline-block w-5 h-5 rounded-full text-white text-xs flex items-center justify-center mr-1"
          style={{ backgroundColor: item.userColor }}
        >
          {item.user.charAt(0).toUpperCase()}
        </span>
        <span className="font-medium">{item.user}</span>
      </>
    );

    if (item.type === 'reaction') {
      return (
        <>
          {baseMessage}
          <span className="text-gray-600"> reacted {item.metadata?.emoji || '😊'} to an image</span>
        </>
      );
    } else if (item.type === 'comment') {
      return (
        <>
          {baseMessage}
          <span className="text-gray-600"> commented on an image</span>
        </>
      );
    }

    return baseMessage;
  }, []);

  const handleActivityClick = useCallback(
    (item) => {
      if (item.imageId) {
        onImageClick(item.imageId);
      }
    },
    [onImageClick]
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (activityFeed.length === 0) {
    return (
      <div className="py-8 text-center text-gray-500">
        <p className="text-sm">No activity yet. Be the first to interact!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {activityFeed.map((item) => (
        <button
          key={item.id}
          onClick={() => handleActivityClick(item)}
          className="
            w-full text-left p-3 rounded-lg
            bg-gray-50 hover:bg-gray-100
            transition-colors duration-150
            border border-gray-200 hover:border-gray-300
          "
        >
          <div className="text-sm flex items-center gap-1">
            {getActivityMessage(item)}
          </div>
          <div className="text-xs text-gray-400 mt-1">
            {new Date(item.timestamp).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            })}
          </div>
        </button>
      ))}
    </div>
  );
};
