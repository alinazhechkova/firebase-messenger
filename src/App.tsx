import React from "react";
import Routes from "./Routes";

import { useDispatch } from "react-redux";
import { auth, firestore } from "./firebase";

import { setCurrentUser } from "./store/actions/user";

import "./App.css";

function App() {
  const dispath = useDispatch();

  React.useEffect(() => {
    auth.onAuthStateChanged(async (authObj) => {
      if (authObj) {
        const userRef = firestore.collection("users").doc(authObj.uid);
        userRef.onSnapshot((doc) => {
          const userData = {
            uid: authObj.uid,
            ...doc.data(),
          };
          dispath(setCurrentUser(userData));
        });
      } else {
        dispath(setCurrentUser(null));
      }
    });
  }, []);

  return (
    <div>
      <Routes />
    </div>
  );
}

export default App;
