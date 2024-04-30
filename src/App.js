import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import appStore from "./utils/store";
import { Provider } from "react-redux";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import YoutubeTitleGenerator from "./components/titleGenerator/YoutubeTitleGenerator";
import YoutubeDescriptionGenerator from "./components/descriptionGenerator/YoutubeDescriptionGenerator";
import YoutubeTagsGenerator from "./components/tagsGenerator/YoutubeTagsGenerator";
import OverView from "./components/Overview";
const App = () => {
  return (
    <Provider store={appStore}>
      <div>
        <RouterProvider router={appRouter} />
      </div>
    </Provider>
  );
};

export default App;

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },

  { path: "/login", element: <LoginPage /> },
  {
    path: "/tools",
    element: <HomePage />,

    children: [
      { path: "/tools", element: <OverView /> },
      {
        path: "/tools/youtube-title-generator",
        element: <YoutubeTitleGenerator />,
      },
      {
        path: "/tools/youtube-description-generator",
        element: <YoutubeDescriptionGenerator />,
      },
      {
        path: "/tools/youtube-tags-generator",
        element: <YoutubeTagsGenerator />,
      },
    ],
  },
]);
