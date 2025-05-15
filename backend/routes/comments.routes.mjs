import {
  getAllComments,
  addComment,
  editCommentById,
  deleteCommentById,
} from "../controller/comments.controller.mjs";

function commentsRouter(app) {
  app.get("/", getAllComments); // GET /api/comments?videoId=xxx
  app.post("/api/comments", addComment); // POST /api/comments
  app.put("/api/comments/:id", editCommentById); // PUT /api/comments -id
  app.delete("/api/comments/:id", deleteCommentById); // DELETE /api/commetns -id
}

export default commentsRouter;
