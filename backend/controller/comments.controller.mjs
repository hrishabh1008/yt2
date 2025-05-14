import commentModel from "../model/comments.model.mjs";
import videoModel from "../model/videos.model.mjs";

// Add comment and link to video
export const addComment = async (req, res) => {
  try {
    const { userId, content, videoId } = req.body;

    if (!userId || !content || !videoId) {
      return res
        .status(400)
        .json({ error: "userId, content, and videoId are required." });
    }

    // #1. Create comment
    const comment = await commentModel.create({
      userName: userId,
      content,
    });

    // #2. Add comment to video's comment list
    await videoModel.findByIdAndUpdate(videoId, {
      $push: { comments: comment._id },
    });

    const populatedComment = await commentModel.findById(comment._id).populate(
      "userName",//field in commentModel
      "userName"//field in userModel
    );
    res.status(201).json(populatedComment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Edit a comment
export const editCommentById = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const updated = await commentModel.findByIdAndUpdate(
      id,
      { content },
      { new: true }
    ).populate("userName", "userName userAvatar");

    if (!updated) return res.status(404).json({ error: "commentModel not found" });

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a comment (also from video)
export const deleteCommentById = async (req, res) => {
  try {
    const { id } = req.params;

    // #1. Find the comment first
    const comment = await commentModel.findById(id);
    if (!comment) return res.status(404).json({ error: "commentModel not found" });

    // #2. Remove it from associated video's comment array
    await videoModel.updateMany({ comments: id }, { $pull: { comments: id } });

    // #3. Delete the comment itself from the main commentModel
    await commentModel.findByIdAndDelete(id);

    res.status(200).json({ message: "commentModel deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all comments (optionally by video)
export const getAllComments = async (req, res) => {
  try {
    const videoId = req.query.videoId;

    let comments;
    if (videoId) {
      const video = await videoModel.findById(videoId).populate({
        path: "comments",
        populate: { path: "userName", select: "userName userAvatar" },
      });
      comments = video?.comments || [];
    } else {
      comments = await commentModel.find().populate("userName", "userName userAvatar");
    }

    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
