import React, { useState } from "react";
import Routes from "./Routes";

import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { auth, firestore } from "./firebase";
import { BrowserRouter } from "react-router-dom";

import { setCurrentUser } from "./store/actions/user";

function App() {
  const dispath = useDispatch();

  const user = useSelector((state: any) => state);
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
