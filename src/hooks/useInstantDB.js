import { db } from '../db/config';

// Subscribe to reactions in real-time using InstantDB's useQuery hook
export const useReactionsSubscription = (imageId) => {
  const query = imageId 
    ? { reactions: {} }
    : null;

  const { isLoading, error, data } = db.useQuery(query);

  // Filter reactions for this image on the client side
  const reactions = data?.reactions?.filter(r => r.imageId === imageId) || [];

  return { reactions, isLoading, error };
};

// Subscribe to comments in real-time using InstantDB's useQuery hook
export const useCommentsSubscription = (imageId) => {
  const query = imageId
    ? { comments: {} }
    : null;

  const { isLoading, error, data } = db.useQuery(query);

  // Filter and sort comments for this image on the client side
  const comments = (data?.comments?.filter(c => c.imageId === imageId) || [])
    .sort((a, b) => a.timestamp - b.timestamp);

  return { comments, isLoading, error };
};

// Subscribe to activity feed in real-time using InstantDB's useQuery hook
export const useActivityFeedSubscription = () => {
  const query = { activityFeed: {} };

  const { isLoading, error, data } = db.useQuery(query);

  // Sort activity feed by timestamp (most recent first)
  const activityFeed = (data?.activityFeed || [])
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 50); // Limit to last 50 activities

  return { activityFeed, isLoading, error };
};
