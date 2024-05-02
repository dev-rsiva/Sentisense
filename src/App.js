import React, { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import appStore from "./utils/store";
import { Provider } from "react-redux";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import YoutubeTitleGenerator from "./components/titleGenerator/YoutubeTitleGenerator";
import YoutubeDescriptionGenerator from "./components/descriptionGenerator/YoutubeDescriptionGenerator";
import YoutubeTagsGenerator from "./components/tagsGenerator/YoutubeTagsGenerator";
import OverView from "./components/overViewPage/OverView";
import { dataContext } from "./utils/dataContext";
import { useNavigate } from "react-router-dom";
const App = () => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isSignInForm, setIsSignInForm] = useState(false);

  console.log(user, isUserAuthenticated);

  return (
    <dataContext.Provider
      value={{
        user,
        setUser,
        isUserAuthenticated,
        setIsUserAuthenticated,
        isSignInForm,
        setIsSignInForm,
      }}
    >
      <Provider store={appStore}>
        <div>
          <RouterProvider router={appRouter} />
        </div>
      </Provider>
    </dataContext.Provider>
  );
};

export default App;

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },

  {
    path: "/login",
    element: <LoginPage />,
  },
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
