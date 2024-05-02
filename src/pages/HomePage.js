import React from "react";
import Header from "../components/Header";
import YoutubeTitleGenerator from "../components/titleGenerator/YoutubeTitleGenerator";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import { dataContext } from "../utils/dataContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
const HomePage = () => {
  const { user, setUser, isUserAuthenticated, setIsUserAuthenticated } =
    useContext(dataContext);

  console.log(user, isUserAuthenticated);

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        console.log("outhStateChanged", user);
        setIsUserAuthenticated(true);
        // console.log("workspaces in outhState changed:", workspaceData);
        // if (performance.getEntriesByType("navigation").length === 1) {
        const { uid, email, displayName, photoURL } = user;
        console.log(uid, email, displayName, photoURL);
        setUser({
          uid: uid,
          email: email,
          displayName: displayName,
          photoURL: photoURL,
        });
        // }
      } else {
        // User is signed out
        // ...
        navigate("/");
        console.log("User is signed out");
      }
    });
    console.log(auth.currentUser);
  }, []);

  // useEffect(() => {
  //   console.log("useEffect from Homepage");
  //   console.log(!user && !isUserAuthenticated);
  //   if (!user && !isUserAuthenticated) {
  //     navigate("/");
  //   }
  // }, [user, isUserAuthenticated]);

  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default HomePage;
