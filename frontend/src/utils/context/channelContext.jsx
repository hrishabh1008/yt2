import React, { createContext, useContext, useState } from "react";

export const ChannelContext = createContext();

export const useChannel = () => useContext(ChannelContext);

export const ChannelProvider = ({ children }) => {
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
