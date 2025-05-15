import channelModel from "../model/channels.model.mjs";
import userModel from "../model/users.model.mjs";

// Controller to create a new channel and optionally associate videos
export const createChannel = async (req, res) => {
  try {
    const { channelName, ownerId, description, channelBanner } = req.body;

    // Check if the user exists (since owner is a reference to the userModel model)
    const user = await userModel.findById(ownerId);
    if (!user) {
      return res.status(404).json({ message: "Owner not found" });
    }

    // Create the new channel
    const newChannel = await channelModel.create({
      channelName,
      ownerId,
      description,
      channelBanner:
        channelBanner ||
        "xyz",
      subscribers: 0,
      // videos: videoIds
    });

    res
      .status(201)
      .json({ message: "channelModel created successfully", newChannel });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Controller to fetch channel information
export const getChannelInfo = async (req, res) => {
  try {
    const { channelId } = req.params;
    console.log(channelId);

    // Find the channel by channelId and populate the videos and owner information
    const channel = await channelModel
      .findById(channelId)
      .populate("ownerId", "userName userAvatar") // Populate the owner's info (userName and userAvatar)
      .populate("videos"); // Populate the videos associated with the channel

    if (!channel) {
      return res.status(404).json({ message: "channelModel not found" });
    }

    res.status(200).json(channel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
