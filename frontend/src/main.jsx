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

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      {
        path: "/watch/:id",
        children: [
          { index: true, element: <WatchVideo /> },
          // { path: ":city", element: <ConcertsCity /> },
          // { path: "trending", element: <ConcertsTrending /> },
        ],
      },
      {
        path: "channel",
        element: <ChannelLayout />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={appRouter} />
  </StrictMode>
);
