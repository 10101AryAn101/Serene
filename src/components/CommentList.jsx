import React from 'react';

export const CommentList = ({ comments = [], isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="py-8 text-center text-gray-500">
        <p className="text-sm">No comments yet. Be the first to comment!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="bg-gray-50 rounded-lg p-4 border border-gray-200"
        >
          <div className="flex items-center gap-2 mb-2">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
              style={{ backgroundColor: comment.userColor }}
            >
              {comment.user.charAt(0).toUpperCase()}
            </div>
            <span className="font-medium text-gray-900">{comment.user}</span>
            <span className="text-xs text-gray-500">
              {new Date(comment.timestamp).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed">{comment.text}</p>
        </div>
      ))}
    </div>
  );
};
