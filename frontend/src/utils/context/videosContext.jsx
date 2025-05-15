import React, { createContext, useContext } from "react";

export const VideosContext = createContext();

export const useVideos = () => useContext(VideosContext);
