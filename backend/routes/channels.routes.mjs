import {
  createChannel,
  getChannelInfo,
} from "../controller/channels.controller.mjs";

function channelsRouter(app) {
  // Route to create a new channel
  app.post("/", createChannel);
  // Route to get channel information by channelId
  app.get("/:channelId", getChannelInfo);
}

export default channelsRouter;
