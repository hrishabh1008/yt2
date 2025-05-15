import {
  createChannel,
  getChannelInfo,
  getChannelByOwner,
} from "../controller/channels.controller.mjs";

function channelsRouter(app) {
  // Route to create a new channel
  app.post("/api/channel", createChannel);
  // Route to get channel information by channelId
  app.get("/api/channel/:channelId", getChannelInfo);
  // Route to get channel by ownerId (user)
  app.get("/api/channel/user/:ownerId", getChannelByOwner);
}

export default channelsRouter;
