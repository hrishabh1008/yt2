import {
  getAllVideos,
  getVideoById,
  getVideoByIdAndDelete,
  getVideoByIdAndUpdate,
  searchVideos,
  uploadVideo,
} from "../controller/videos.controller.mjs";

function videosRouter(app) {
  app.get("/api/videos", getAllVideos);
  app.get("/api/videos/search", searchVideos); // ?title=react&category=web
  app.get("/api/videos/:id", getVideoById);
  app.put("/api/videos/:id", getVideoByIdAndUpdate);
  app.delete("/api/videos/:id", getVideoByIdAndDelete);
  app.post("/api/videos", uploadVideo);
  // app.post("/vid", uploadVideos);
}

export default videosRouter;
