import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { dataContext } from "../utils/dataContext";
import { useContext } from "react";
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import Header from "../components/Header";
import MainContent from "../components/landingPage/MainContent";
import Footer from "../components/Footer";

const LandingPage = () => {
  const {user, setUser, isUserAuthenticated, setIsUserAuthenticated} =
    useContext(dataContext);

  console.log(user, isUserAuthenticated);

  const navigate = useNavigate();

  useEffect(() => {
    if (user && isUserAuthenticated) {
      navigate("/tools");
    }
  }, [user, isUserAuthenticated]);

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
        console.log("User is signed out");
      }
    });
    console.log(auth.currentUser);
  }, []);

  return (
    <div>
      <Header fromLandingPage={true} />
      <MainContent />
      <Footer />
    </div>
  );
};

export default LandingPage;
