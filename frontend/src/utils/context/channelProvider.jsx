import { useContext } from "react";
import { useState } from "react";
import { ChannelContext } from "./channelContext";




export const ChannelProvider = ({ children }) => {
useContext(ChannelContext)

  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <ChannelContext.Provider value={{ channel, setChannel, videos, setVideos, loading, setLoading, error, setError }}>
      {children}
    </ChannelContext.Provider>
  );
};
