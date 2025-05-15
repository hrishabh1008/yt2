import videoModel from "../model/videos.model.mjs";
import channelModel from "../model/channels.model.mjs";

export const getAllVideos = async (req, res) => {
  try {
    // const videos = await videoModel.find();
    const videos = await videoModel.find().populate({
      path: "comments", //"comments" is field of videoModel with reference to commentModel
      populate: {
        path: "userName", //"userName" is field in commentModel with reference to userModel
        select: "userName userAvatar", // Only get these userName and userAvatar from the the userModel
      },
    });

    res.json(videos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getVideoById = async (req, res) => {
  try {
    // const video = await videoModel.findById(req.params.id);
    const video = await videoModel.findById(req.params.id).populate({
      path: "comments", //"comments" is field of videoModel with reference to commentModel
      populate: {
        path: "userName", //"userName" is field in commentModel with reference to userModel
        select: "userName userAvatar", // Only get these userName and userAvatar from the the userModel
      },
    });

    if (!video) return res.status(404).json({ error: "videoModel not found" });

    res.json(video);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getVideoByIdAndUpdate = async (req, res) => {
  try {
    const updatedVideo = await videoModel
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate({
        path: "comments",
        populate: {
          path: "userName",
          select: "userName userAvatar",
        },
      });

    if (!updatedVideo) {
      return res.status(404).json({ error: "videoModel not found" });
    }

    res.json(updatedVideo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getVideoByIdAndDelete = async (req, res) => {
  try {
    const deletedVideo = await videoModel
      .findByIdAndDelete(req.params.id)
      .populate({
        path: "comments",
        populate: {
          path: "userName",
          select: "userName userAvatar",
        },
      });

    if (!deletedVideo) {
      return res.status(404).json({ error: "videoModel not found" });
    }

    res.json({ message: "Video deleted successfully", video: deletedVideo });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



export const searchVideos = async (req, res) => {
  try {
    const { title, category } = req.query;
    const query = {};

    if (title) {
      query.title = { $regex: title, $options: "i" }; //$regex= query to match pattern within string fields & $options : "i" makes the pattern matching insensitive to the case of string(i.e. irrespective of upper/lower case)
    }

    if (category) {
      query.description = { $regex: category, $options: "i" };
    }

    const videos = await videoModel.find(query);
    res.json(videos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const uploadVideo = async (req, res) => {
  try {
    const { title, videoUrl, description, channelId, userId } = req.body;
    if (!title || !videoUrl || !channelId || !userId) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    // Create the video
    const video = await videoModel.create({
      title,
      videoUrl,
      description,
      channelName: channelId,
      uploadDate: new Date(),
      // Optionally add more fields (e.g., thumbnailUrl, etc.)
    });
    // Add video to channel's videos array
    await channelModel.findByIdAndUpdate(channelId, {
      $push: { videos: video._id },
    });
    res.status(201).json({ message: "Video uploaded successfully", video });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// export const uploadVideos = async (req, res) => {
//   try {
//     const {
//       title,
//       videoUrl,
//       thumbnailUrl,
//       description,
//       channelName,
//       views,
//       likes,
//       dislikes,
//       uploadDate,
//       subscriberCount,
//       comments,
//     } = req.body;
//     const videoArray = req.body;

//     const inserted = await videoModel.insertMany(videoArray);
//     inserted ? console.log("success") : console.log("failed");
//   } catch (error) {
//     console.log(error);
//   }
// };