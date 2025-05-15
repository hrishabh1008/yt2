# YouTube Retro Clone

A full-stack YouTube-like video platform built with React (Vite), Node.js, and MongoDB. Users can create channels, upload/edit/delete videos, and manage their own channel page with a modern, responsive UI.

---

## Features

### User & Channel
- User registration and login (authentication)
- Create a channel (one per user)
- View your channel page
- Edit channel details (name, description, etc.)

### Video Management
- Upload videos to your channel (title, description, video URL, thumbnail)
- Edit and delete your own videos
- See a list/grid of all your channel's videos
- Video details: title, description, views, upload date, channel avatar
- Instant UI updates for all video actions (no reload required)

### Channel Page
- See your channel info, subscribers, and actions (Subscribe, Join, Upload Video)
- Tabs for Home, Videos, Shorts, Playlists, etc. (UI only, extendable)
- Responsive video grid with always-visible Edit/Delete buttons for owners
- Modern, clean UI/UX with toasts and empty states

### Backend API
- RESTful endpoints for channels and videos (CRUD)
- MongoDB models for users, channels, and videos
- Secure routes for video/channel management

---

## Tech Stack

- **Frontend:** React (Vite), Tailwind CSS (utility classes), React Router
- **Backend:** Node.js, Express.js, MongoDB (Mongoose)
- **Authentication:** JWT (JSON Web Token)
- **Other:** Multiavatar for channel avatars, modern CSS for UI polish

---

## Application Flow

1. **User signs up or logs in**
2. If the user has no channel, they are prompted to create one
3. On the channel page, the user can:
   - Upload new videos
   - Edit or delete existing videos
   - See all their videos in a grid
   - Edit channel details (future)
4. All actions update the UI instantly and sync with the backend

---

## File Structure (Key Files)

```
backend/
  controller/
    channels.controller.mjs
    videos.controller.mjs
  model/
    channels.model.mjs
    videos.model.mjs
  routes/
    channels.routes.mjs
    videos.routes.mjs
  server.mjs
frontend/
  src/
    components/
      VideoThumbnail.jsx
      FetchVideosService.jsx
      channel/
        ChannelPageLayout.jsx
        ChannelHeader.jsx
        ChannelTabs.jsx
        ChannelVideoGrid.jsx
        ChannelModals.jsx
        CreateChannel.jsx
        EditVideoModal.jsx
        UploadVideoModal.jsx
    utils/
      context/
        channelContext.jsx
        channelProvider.jsx
        usersContext.jsx
        videosContext.jsx
```

---

## GitHub Repository

- [GitHub Repo Link](https://github.com/hrishabh1008/yt2.git)


---

## How to Run

**CLONE REPOSITORY**

1. **Backend:**
   - `cd backend`
   - `npm install`
   - `npm start` (or `node server.mjs`)
2. **Frontend:**
   - `cd frontend`
   - `npm install`
   - `npm run dev`
3. Visit `http://localhost:5173` (or the port Vite shows)

---

## Extending & Customization
- Add more video metadata (duration, tags, etc.)
- Implement comments, likes, and subscriptions
- Add search and filtering
- Improve authentication and permissions
- Add video upload (file, not just URL)

---

## Credits
- Multiavatar for avatars
- Vite, React, Node.js, MongoDB, Tailwind CSS

---

## License
MIT
