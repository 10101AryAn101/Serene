import React, { useState, useCallback } from 'react';

export const CommentInput = ({ onSubmit, isLoading = false, placeholder = "Add a comment..." }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = useCallback(async () => {
    if (!comment.trim()) {
      return;
    }

    await onSubmit(comment);
    setComment('');
  }, [comment, onSubmit]);

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }, [handleSubmit]);

  return (
    <div className="flex gap-2">
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        disabled={isLoading}
        className="
          flex-1 resize-none
          px-4 py-2 rounded-lg border border-gray-300
          placeholder-gray-400 text-gray-900 text-sm
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          disabled:bg-gray-100 disabled:text-gray-500
          transition-all duration-150
        "
        rows={3}
      />
      <button
        onClick={handleSubmit}
        disabled={isLoading || !comment.trim()}
        className="
          px-4 py-2 rounded-lg
          bg-blue-500 text-white font-medium
          hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed
          transition-colors duration-150
          self-start
        "
      >
        {isLoading ? 'Posting...' : 'Post'}
      </button>
    </div>
  );
};
