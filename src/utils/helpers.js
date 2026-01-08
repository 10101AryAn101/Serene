// Format timestamp to readable time
export const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  
  // If within last minute, show "just now"
  const now = Date.now();
  const diff = now - timestamp;
  
  if (diff < 60000) {
    return 'just now';
  }
  
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Format timestamp to full date + time
export const formatFullTime = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString([], {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

// Truncate text with ellipsis
export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + '...';
};

// Generate unique ID
export const generateId = (prefix = '') => {
  return `${prefix}${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Group array of items by a key
export const groupBy = (items, keyFn) => {
  const groups = {};
  items.forEach((item) => {
    const key = keyFn(item);
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
  });
  return groups;
};

// Count unique values in array
export const countUnique = (items, keyFn) => {
  const seen = new Set();
  items.forEach((item) => {
    seen.add(keyFn(item));
  });
  return seen.size;
};

// Sort array by timestamp (descending - newest first)
export const sortByTimestampDesc = (items) => {
  return [...items].sort((a, b) => b.timestamp - a.timestamp);
};

// Sort array by timestamp (ascending - oldest first)
export const sortByTimestampAsc = (items) => {
  return [...items].sort((a, b) => a.timestamp - b.timestamp);
};

// Debounce function for optimizing frequent calls
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// Throttle function for rate limiting
export const throttle = (func, limit) => {
  let lastRun = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastRun >= limit) {
      func(...args);
      lastRun = now;
    }
  };
};
