import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    videoUrl: { type: String, required: true },
    thumbnailUrl: { type: String },
    description: { type: String },
    channelName: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the Channel model
      ref: "channels",
      required: true,
    },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    uploadDate: { type: Date, required: true },
    subscriberCount: { type: Number, default: 0 },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comments", //reference to comment model
      },
    ],
  },
  { timestamps: true }
);

const videoModel = mongoose.model("videos", videoSchema);
export default videoModel;
