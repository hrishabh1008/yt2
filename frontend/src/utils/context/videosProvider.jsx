import { useContext, useEffect, useState } from "react";
import { VideosContext } from "./videosContext";
import { getAllVideos } from "../../components/FetchVideosService";


export const VideosProvider = ({ children }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    

    useContext(VideosContext)

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const data = await getAllVideos();
        setVideos(data);
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  return (
    <VideosContext.Provider value={{ videos, setVideos, loading, error }}>
      {children}
    </VideosContext.Provider>
  );
};