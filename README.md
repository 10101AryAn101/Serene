# Serene

A real-time image gallery with live emoji reactions, comments, and activity feed.

## Live Preview 

- https://serene-jbla.onrender.com/

## Features

- Real-time emoji reactions & comments
- Image gallery with infinite scroll (Unsplash API)
- Image detail modal with reactions & comments
- Live activity feed showing all interactions
- Zero page refresh needed

## Tech Stack

React 18 • Tailwind CSS • React Query • Zustand • InstantDB • Unsplash API • Vite

## Quick Setup

### 1. Get API Keys

**Unsplash**: https://unsplash.com/oauth/applications → copy Access Key
**InstantDB**: https://instantdb.com → create app → copy App ID

### 2. Install & Configure

```bash
npm install
```

Create `.env`:
```
VITE_UNSPLASH_API_KEY=your_key
VITE_INSTANTDB_ID=your_id
```

### 3. Setup InstantDB Tables

Create 4 tables in InstantDB dashboard:
- **images**: id, url, title, photographer, createdAt
- **reactions**: id, imageId, emoji, user, userColor, timestamp
- **comments**: id, imageId, text, user, userColor, timestamp
- **activityFeed**: id, type, imageId, user, userColor, metadata, timestamp

### 4. Run

```bash
npm run dev
```

Open http://localhost:5173

## Architecture

- **State**: Zustand (UI) + React Query (API) + InstantDB (real-time)
- **Styling**: Tailwind CSS responsive
- **Real-time**: InstantDB subscriptions auto-update all tabs
- **Components**: Modular, functional with hooks



## Challenges Solved

I definitely never heard of InstantDB so I learned about it with the help of internet and try to learn about it as much as possible. Other than that the issue I had I'm going to write below.

| Problem | Solution |
|---------|----------|
| Real-time sync across tabs | InstantDB subscriptions auto-update |
| Emoji picker overflow | Limited height + internal scroll |
| Duplicate activity entries | Removed duplicate logging |
| Load more button | Intersection Observer for infinite scroll |


## Future Improvements

- User authentication & profiles
- Image search & filtering
- Comment replies
- User image uploads
- Notifications system
- Image lazy loading
- Dark mode


## Demo

Test real-time with two tabs:
1. Open app in Tab 1 and Tab 2 side-by-side
2. Add reaction in Tab 1 → see instantly in Tab 2
3. Add comment in Tab 1 → see in Tab 2 + activity feed
4. Everything syncs with zero page refresh


## Project Structure

```
src/
├── components/     # React components
├── hooks/         # Custom hooks
├── store/         # Zustand state
├── db/            # Database config & queries
├── App.jsx        # Main component
└── index.css      # Tailwind styles
```

## Learn More

- [React Query](https://tanstack.com/query)
- [InstantDB](https://www.instantdb.com/docs)
- [Zustand](https://github.com/pmndrs/zustand)
- [Tailwind](https://tailwindcss.com)
