import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/HomePage";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import ChannelLayout from "./components/channel/ChannelLayout";
import WatchVideo from "./components/watch/WatchVideo";
import NotFound from "./components/NotFound";
import WatchPageLayout from "./components/watch/WatchPageLayout";
import { UserProvider } from "./utils/context/userProvider";
import { VideosProvider } from "./utils/context/videosProvider";
import { CommentProvider } from "./utils/context/commentsProvider";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "watch/:id", element: <WatchPageLayout /> },
      // { path: ":city", element: <ConcertsCity /> },
      // { path: "trending", element: <ConcertsTrending /> },

      {
        path: "channel",
        element: <ChannelLayout />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={appRouter} />
    </UserProvider>
  </StrictMode>
);
