import React, { useState, useCallback } from 'react';
import { useReactionsSubscription, useCommentsSubscription } from '../hooks/useInstantDB';
import { dbQueries } from '../db/queries';
import { useAppStore } from '../store/appStore';
import EmojiPicker from 'emoji-picker-react';
import { CommentList } from './CommentList';
import { CommentInput } from './CommentInput';

export const ImageDetailModal = ({ image, onClose }) => {
  const { user } = useAppStore();
  const { reactions, isLoading: reactionsLoading } = useReactionsSubscription(image.id);
  const { comments, isLoading: commentsLoading } = useCommentsSubscription(image.id);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  const handleAddReaction = useCallback(async (emoji) => {
    try {
      // Check if user already reacted with this emoji
      const existingReaction = reactions.find(
        (r) => r.emoji === emoji && r.user === user.name
      );

      if (existingReaction) {
        // Remove the reaction if it exists
        await dbQueries.deleteReaction(existingReaction.id);
      } else {
        // Add the reaction (activity feed is added automatically)
        await dbQueries.addReaction(image.id, emoji, user.name, user.color);
      }
    } catch (error) {
      console.error('Error adding reaction:', error);
    }
  }, [reactions, image.id, user]);

  const handleAddComment = useCallback(async (text) => {
    try {
      setIsSubmittingComment(true);
      // Add comment (activity feed is added automatically)
      await dbQueries.addComment(image.id, text, user.name, user.color);
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setIsSubmittingComment(false);
    }
  }, [image.id, user]);

  const handleEmojiSelect = useCallback((emojiObject) => {
    handleAddReaction(emojiObject.emoji);
    setShowEmojiPicker(false);
  }, [handleAddReaction]);

  const handleBackdropClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto max-w-4xl w-full">
        <button
          onClick={onClose}
          className="
            absolute top-2 right-2 sm:top-4 sm:right-4 z-60
            w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300
            flex items-center justify-center text-lg font-bold
            transition-colors duration-150
          "
        >
          ✕
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 p-4 sm:p-6">
          {/* Image */}
          <div className="md:col-span-1">
            <div className="md:sticky md:top-6">
              <img
                src={image.url}
                alt={image.title}
                className="w-full rounded-lg object-cover shadow-lg max-h-[40vh] md:max-h-none"
              />
              <div className="mt-3 sm:mt-4">
                <p className="font-medium text-gray-900 text-sm sm:text-base">{image.title}</p>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">by {image.photographer}</p>
              </div>
            </div>
          </div>

          {/* Reactions and Comments */}
          <div className="md:col-span-2 space-y-4 sm:space-y-6">
            {/* Reactions Section */}
            <div className="border-b pb-4 sm:pb-6">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Reactions</h3>
                <button
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="text-2xl hover:scale-110 transition-transform"
                  title="Add reaction"
                >
                  ➕
                </button>
              </div>

              {!showEmojiPicker && (
                <div className="flex flex-wrap gap-2">
                  {reactionsLoading ? (
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                  ) : reactions.length > 0 ? (
                    reactions.reduce((acc, reaction) => {
                      const existing = acc.find(r => r.emoji === reaction.emoji);
                      if (existing) {
                        existing.count += 1;
                        if (!existing.users.includes(reaction.user)) {
                          existing.users.push(reaction.user);
                        }
                      } else {
                        acc.push({
                          emoji: reaction.emoji,
                          count: 1,
                          users: [reaction.user],
                        });
                      }
                      return acc;
                    }, []).map((group) => (
                      <button
                        key={group.emoji}
                        onClick={() => handleAddReaction(group.emoji)}
                        className="px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-sm"
                        title={group.users.join(', ')}
                      >
                        {group.emoji} {group.count > 1 ? group.count : ''}
                      </button>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No reactions yet. Click ➕ to add one!</p>
                  )}
                </div>
              )}

              {showEmojiPicker && (
                <div className="mt-4 max-h-[350px] overflow-y-auto">
                  <EmojiPicker
                    onEmojiClick={handleEmojiSelect}
                    width="100%"
                    height={350}
                  />
                </div>
              )}
            </div>

            {/* Comments Section */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Comments</h3>

              {/* Comment Input */}
              <div className="mb-4 sm:mb-6">
                <CommentInput
                  onSubmit={handleAddComment}
                  isLoading={isSubmittingComment}
                />
              </div>

              {/* Comments List */}
              <CommentList
                comments={comments}
                isLoading={commentsLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
