// import backgroundImg from "./Planly-login-bg-image2.jpg";
// import planlyLogo from "../../Planly-workflow-organiser.png";
// import img1 from "./8451586_3914790.jpg";
// import img2 from "./12085888_20944370.jpg";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import { checkValidData } from "../utils/validate";
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { randomAvatar } from "../utils/avatarGenerator";
// import { data } from "../utills/utills";
// import { cardData } from "../utills/cardData";
// import allTemplatesData from "../utills/allTemplatesData";
import { doc, collection, setDoc, getDocs, query } from "firebase/firestore";
import { db } from "../utils/firebase";
import { BG_IMG } from "../utils/constants";
import { useContext } from "react";
import { dataContext } from "../utils/dataContext";

const LoginPage = ({
  // setIsUserAuthenticated,
  // user,
  // setUser,
  workspaceData,
  setWorkspaceData,
  setAllCardData,
  setTemplatesData,
}) => {
  const [errorMessage, setErrorMessage] = useState(null);

  const {
    user,
    setUser,
    isUserAuthenticated,
    setIsUserAuthenticated,
    isSignInForm,
    setIsSignInForm,
  } = useContext(dataContext);
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

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  console.log(
    name?.current?.value,
    email?.current?.value,
    password?.current?.value
  );
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
    setErrorMessage(null);
  };

  const handleSignInClick = () => {
    //email and password validation
    const message = checkValidData(
      email.current.value,
      password.current.value,
      name.current?.value,
      isSignInForm
    );
    console.log(message);
    //updating the error message, message return null if validation success else return the validation error message when validation fails
    setErrorMessage(message);

    //if message returns null, then validation success and allow code execution futher. If message returns validation error message(Eg.Email ID is not valid) then do not allow code execution further
    if (message) return;

    if (!isSignInForm) {
      //sign up logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log(user);

          // Update user profile
          return updateProfile(user, {
            displayName: name.current.value,
            photoURL: randomAvatar,
          });
        })
        .then(() => {
          // Profile updated successfully
          console.log("Profile updated!");
          const user = auth.currentUser;
          const { uid, email, displayName, photoURL } = user;
          console.log(uid, email, displayName, photoURL);
          setUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          });

          // const updateUserWorkspacesData = async () => {
          //   // if (!workspaceData || !userId) return;

          //   const userDocRef = doc(db, "users", uid);
          //   const workspacesCollectionsRef = collection(
          //     userDocRef,
          //     "workspaces"
          //   );
          //   const workspaceDocRef = doc(
          //     workspacesCollectionsRef,
          //     "workspacesDoc"
          //   );

          //   try {
          //     // Check if the document exists
          //     const querySnapshot = await getDocs(workspacesCollectionsRef);

          //     if (querySnapshot.empty) {
          //       // Document doesn't exist, create it with the new data
          //       console.log(data);
          //       // const newData = JSON.parse(JSON.stringify(data));
          //       await setDoc(workspaceDocRef, data);
          //       console.log(data);
          //       setWorkspaceData((prev) => ({ ...data }));
          //       console.log("workspaces", workspaceData);
          //       console.log("New Workspaces data added to Firestore");
          //     }
          //   } catch (error) {
          //     console.error(
          //       "Error updating Workspaces data in Firestore:",
          //       error
          //     );
          //   }

          //   // const getWorkspaceData = async () => {
          //   //   const userDocRef = doc(db, "users", user?.uid);
          //   //   const workspacesCollectionRef = collection(userDocRef, "workspaces");
          //   //   const workspaceQuery = query(workspacesCollectionRef);
          //   //   const querySnapshot = await getDocs(workspaceQuery);
          //   //   const updatedWorkspaceData = querySnapshot?.docs[0]?.data();
          //   //   console.log(updatedWorkspaceData);
          //   //   setWorkspaceData(updatedWorkspaceData);
          //   // };
          //   // await getWorkspaceData();
          // };

          // const updateUserAllCardData = async () => {
          //   // if (!allCardData || !userId) return;

          //   const userDocRef = doc(db, "users", uid);
          //   const allCardCollectionsRef = collection(userDocRef, "allCardData");
          //   const allCardDocRef = doc(allCardCollectionsRef, "allCardDataDoc");

          //   try {
          //     const querySnapshot = await getDocs(allCardCollectionsRef);

          //     if (querySnapshot.empty) {
          //       await setDoc(allCardDocRef, cardData);
          //       setAllCardData((prev) => ({ ...cardData }));
          //       console.log("New allCardData added to Firestore");
          //     }
          //   } catch (error) {
          //     console.error("Error updating allCardData in Firestore:", error);
          //   }

          //   // const getAllCardData = async () => {
          //   //   const userDocRef = doc(db, "users", user?.uid);
          //   //   const allcardDataCollectionRef = collection(userDocRef, "allCardData");
          //   //   const allcardDataQuery = query(allcardDataCollectionRef);
          //   //   const querySnapshot = await getDocs(allcardDataQuery);
          //   //   const updatedAllCardData = querySnapshot?.docs[0]?.data();
          //   //   setAllCardData(updatedAllCardData);
          //   // };
          //   // await getAllCardData();
          // };

          // const updateUserTemplatesData = async () => {
          //   // if (!templatesData || !userId) return;

          //   const userDocRef = doc(db, "users", uid);
          //   const templatesCollectionsRef = collection(userDocRef, "templates");
          //   const templatesDocRef = doc(
          //     templatesCollectionsRef,
          //     "templatesDoc"
          //   );

          // try {
          //   const querySnapshot = await getDocs(templatesCollectionsRef);

          //   if (querySnapshot.empty) {
          //     await setDoc(templatesDocRef, allTemplatesData);
          //     setTemplatesData((prev) => ({ ...allTemplatesData }));
          //     console.log("New Templates data added to Firestore");
          //   }
          // } catch (error) {
          //   console.error(
          //     "Error updating Templates data in Firestore:",
          //     error
          //   );
          // }

          // const getTemplatesData = async () => {
          //   const userDocRef = doc(db, "users", user?.uid);
          //   const templatesDataCollectionRef = collection(userDocRef, "templates");
          //   const templatesDataQuery = query(templatesDataCollectionRef);
          //   const querySnapshot = await getDocs(templatesDataQuery);
          //   const updatedTemplatesData = querySnapshot?.docs[0]?.data();
          //   setTemplatesData(updatedTemplatesData);
          // };
          // await getTemplatesData();
          // }

          // Call update functions for each data type
          // if (uid) {
          //   updateUserWorkspacesData();
          //   updateUserAllCardData();
          //   updateUserTemplatesData();
          // }

          navigate("/");
        })
        .catch((error) => {
          // Handle errors
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else if (isSignInForm) {
      //sign in logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);

          const { uid, email, displayName, photoURL } = user;
          console.log(uid, email, displayName, photoURL);
          setUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          });

          // const updateUserWorkspacesData = async () => {
          //   // if (!workspaceData || !userId) return;

          //   const userDocRef = doc(db, "users", uid);
          //   const workspacesCollectionsRef = collection(
          //     userDocRef,
          //     "workspaces"
          //   );
          //   const workspaceDocRef = doc(
          //     workspacesCollectionsRef,
          //     "workspacesDoc"
          //   );

          //   try {
          //     // Check if the document exists
          //     const querySnapshot = await getDocs(workspacesCollectionsRef);

          //     if (!querySnapshot.empty) {
          //       // Document exist, update local state variabel with the existing firestore data
          //       const updatedWorkspaceData = querySnapshot?.docs[0]?.data();
          //       console.log(updatedWorkspaceData);
          //       setWorkspaceData(updatedWorkspaceData);
          //       console.log("Workspaces data added to local state variable");
          //     }
          //   } catch (error) {
          //     console.error(
          //       "Error updating Workspaces data in local state variable:",
          //       error
          //     );
          //   }

          //   // const getWorkspaceData = async () => {
          //   //   const userDocRef = doc(db, "users", user?.uid);
          //   //   const workspacesCollectionRef = collection(userDocRef, "workspaces");
          //   //   const workspaceQuery = query(workspacesCollectionRef);
          //   //   const querySnapshot = await getDocs(workspaceQuery);
          //   //   const updatedWorkspaceData = querySnapshot?.docs[0]?.data();
          //   //   console.log(updatedWorkspaceData);
          //   //   setWorkspaceData(updatedWorkspaceData);
          //   // };
          //   // await getWorkspaceData();
          // };

          // const updateUserAllCardData = async () => {
          //   // if (!allCardData || !userId) return;

          //   const userDocRef = doc(db, "users", uid);
          //   const allCardCollectionsRef = collection(userDocRef, "allCardData");
          //   const allCardDocRef = doc(allCardCollectionsRef, "allCardDataDoc");

          //   try {
          //     const querySnapshot = await getDocs(allCardCollectionsRef);

          //     if (!querySnapshot.empty) {
          //       const updatedAllCardData = querySnapshot?.docs[0]?.data();
          //       setAllCardData(updatedAllCardData);
          //       console.log("allCardData data added to local state variable");
          //     }
          //   } catch (error) {
          //     console.error(
          //       "Error updating allCardData in local state variable:",
          //       error
          //     );
          //   }

          //   // const getAllCardData = async () => {
          //   //   const userDocRef = doc(db, "users", user?.uid);
          //   //   const allcardDataCollectionRef = collection(userDocRef, "allCardData");
          //   //   const allcardDataQuery = query(allcardDataCollectionRef);
          //   //   const querySnapshot = await getDocs(allcardDataQuery);
          //   //   const updatedAllCardData = querySnapshot?.docs[0]?.data();
          //   //   setAllCardData(updatedAllCardData);
          //   // };
          //   // await getAllCardData();
          // };

          // const updateUserTemplatesData = async () => {
          //   // if (!templatesData || !userId) return;

          //   const userDocRef = doc(db, "users", uid);
          //   const templatesCollectionsRef = collection(userDocRef, "templates");
          //   const templatesDocRef = doc(
          //     templatesCollectionsRef,
          //     "templatesDoc"
          //   );

          //   try {
          //     const querySnapshot = await getDocs(templatesCollectionsRef);

          //     if (!querySnapshot.empty) {
          //       const updatedTemplatesData = querySnapshot?.docs[0]?.data();
          //       setTemplatesData(updatedTemplatesData);
          //       console.log("Templates data added to local state variable");
          //     }
          //   } catch (error) {
          //     console.error(
          //       "Error updating templatesData in local state variable::",
          //       error
          //     );
          //   }

          //   // const getTemplatesData = async () => {
          //   //   const userDocRef = doc(db, "users", user?.uid);
          //   //   const templatesDataCollectionRef = collection(userDocRef, "templates");
          //   //   const templatesDataQuery = query(templatesDataCollectionRef);
          //   //   const querySnapshot = await getDocs(templatesDataQuery);
          //   //   const updatedTemplatesData = querySnapshot?.docs[0]?.data();
          //   //   setTemplatesData(updatedTemplatesData);
          //   // };
          //   // await getTemplatesData();
          // };

          // // Call update functions for each data type
          // if (uid) {
          //   updateUserWorkspacesData();
          //   updateUserAllCardData();
          //   updateUserTemplatesData();
          // }

          navigate("/");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  return (
    <div className="relative">
      <div className="absolute w-full ">
        <Header fromLandingPage={false} />
      </div>

      <div className="h-[100vh] text-black font-bold text-2xl flex justify-center items-center bg-gradient-to-b from-[#0E111D] to-[#0d132b] w-full -z-10" />

      <div className="sm:w-[350px] absolute sm:top-1/2 sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:-translate-y-[45%] bg-white shadow-spread rounded-xl p-6 mx-10 top-1/2 -translate-y-[45%]">
        <form onSubmit={(e) => e.preventDefault()}>
          <h1 className="text-2xl font-bold pl-1 py-2">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>

          {!isSignInForm && (
            <div className="my-3">
              <input
                ref={name}
                type="text"
                className="w-full px-4 py-2 my-1 focus:outline-none border-2 focus:border-2 rounded border-slate-00 focus:border-blue-600"
                placeholder="Full name"
              />
              <p className="text-xs text-custom font-semibold pl-[2px]">
                At least 5 characters long.
              </p>
            </div>
          )}
          <div className="my-3">
            <input
              ref={email}
              type="text"
              className="w-full px-4 py-2 my-1 focus:outline-none border-2 focus:border-2 rounded border-slate-00 focus:border-blue-600"
              placeholder="Email Address"
            />
            <p className="text-xs text-custom font-semibold pl-[2px]">
              Eg. example@example.com
            </p>
          </div>

          <div className="my-3">
            <input
              ref={password}
              type="text"
              className="w-full px-4 py-2 my-1 focus:outline-none border-2 focus:border-2 rounded border-slate-00 focus:border-blue-600"
              placeholder="Password"
            />
            <p className="text-xs text-custom font-semibold pl-[2px]">
              At least 8 characters, one uppercase letter, one lowercase letter,
              one special character and one number.
            </p>
          </div>

          <div className="my-3">
            <button
              className="w-full bg-blue-700 text-base text-white px-4 py-3 font-medium my-1 rounded"
              onClick={() => handleSignInClick()}
            >
              {isSignInForm ? "Sign In" : "Sign Up"}
            </button>
          </div>
          <p className="text-red-500">{errorMessage}</p>
          <p
            className="cursor-pointer text-sm text-custom font-semibold pl-[2px]"
            onClick={() => toggleSignInForm()}
          >
            {isSignInForm
              ? "New to SentiSense? Sign up form"
              : "Already registered, Sign In Now"}
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
