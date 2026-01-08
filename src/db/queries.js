import { db } from './config';
import { id } from '@instantdb/react';

export const dbQueries = {
  // Reactions
  addReaction: async (imageId, emoji, user, userColor) => {
    const reactionId = id();
    try {
      await db.transact([
        db.tx.reactions[reactionId].update({
          imageId,
          emoji,
          user,
          userColor,
          timestamp: Date.now(),
        })
      ]);
      
      // Also add to activity feed
      await dbQueries.addActivityFeedItem('reaction', imageId, user, userColor, { emoji });
      
      return reactionId;
    } catch (error) {
      console.error('Error in addReaction:', error);
      throw error;
    }
  },

  deleteReaction: async (reactionId) => {
    try {
      await db.transact([
        db.tx.reactions[reactionId].delete()
      ]);
    } catch (error) {
      console.error('Error in deleteReaction:', error);
      throw error;
    }
  },

  // Comments
  addComment: async (imageId, text, user, userColor) => {
    const commentId = id();
    try {
      await db.transact([
        db.tx.comments[commentId].update({
          imageId,
          text,
          user,
          userColor,
          timestamp: Date.now(),
        })
      ]);
      
      // Also add to activity feed
      await dbQueries.addActivityFeedItem('comment', imageId, user, userColor, { text });
      
      return commentId;
    } catch (error) {
      console.error('Error in addComment:', error);
      throw error;
    }
  },

  // Activity Feed
  addActivityFeedItem: async (type, imageId, user, userColor, metadata) => {
    const itemId = id();
    try {
      await db.transact([
        db.tx.activityFeed[itemId].update({
          type,
          imageId,
          user,
          userColor,
          metadata,
          timestamp: Date.now(),
        })
      ]);
    } catch (error) {
      console.error('Error in addActivityFeedItem:', error);
      // Don't throw - activity feed is non-critical
    }
  },
};

