import mongoose from "mongoose";

const channelSchema = new mongoose.Schema(
  {
    channelName: { type: String, required: true },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", //reference to user model
      required: true,
    }, // User reference
    description: { type: String, required: true },
    channelBanner: {
      type: String,
      default: "https://example.com/default-banner.png",
    },
    subscribers: { type: Number, default: 0 },
    videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "videos" }], // Reference to the Video model
  },
  { timestamps: true }
);

const channelModel = mongoose.model("channels", channelSchema);
export default channelModel;
