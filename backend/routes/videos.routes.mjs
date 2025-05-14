import {
  getAllVideos,
  getVideoById,
  searchVideos,
} from "../controller/videos.controller.mjs";

function videosRouter(app) {
  app.get("/api/videos", getAllVideos);
  app.get("/api/videos/search", searchVideos); // ?title=react&category=web
  app.get("/api/videos/:id", getVideoById);
  // app.post("/vid", uploadVideos);
}

export default videosRouter;
