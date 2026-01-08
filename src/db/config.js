import { init } from '@instantdb/react';

const APP_ID = import.meta.env.VITE_INSTANTDB_ID;

if (!APP_ID) {
  throw new Error('Missing VITE_INSTANTDB_ID environment variable');
}

// Initialize InstantDB with devtool disabled
export const db = init({ 
  appId: APP_ID,
  devtool: false 
});

// Define the expected schema structure
export const schema = {
  images: {
    id: 'string',
    url: 'string',
    title: 'string',
    photographer: 'string',
    createdAt: 'number',
  },
  reactions: {
    id: 'string',
    imageId: 'string',
    emoji: 'string',
    user: 'string',
    userColor: 'string',
    timestamp: 'number',
  },
  comments: {
    id: 'string',
    imageId: 'string',
    text: 'string',
    user: 'string',
    userColor: 'string',
    timestamp: 'number',
  },
  activityFeed: {
    id: 'string',
    type: 'string', // 'reaction' | 'comment'
    imageId: 'string',
    user: 'string',
    userColor: 'string',
    metadata: 'object', // { emoji?: string, text?: string }
    timestamp: 'number',
  },
};
