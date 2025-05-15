import React, { createContext, useContext } from "react";

export const ChannelContext = createContext();

export const useChannel = () => useContext(ChannelContext);
