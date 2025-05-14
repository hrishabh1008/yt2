import {
  getAllVideos,
  getVideoById,
  searchVideos,
} from "../controller/videos.controller.mjs";

function videosRouter(app) {
  app.get("/", getAllVideos);
  app.get("/search", searchVideos); // ?title=react&category=web
  app.get("/:id", getVideoById);
}

export default videosRouter;
