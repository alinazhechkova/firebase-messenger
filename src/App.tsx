import React from "react";
import Routes from "./Routes";

import { useDispatch } from "react-redux";
import { auth, db } from "./firebase";

import { setCurrentUser } from "./store/actions/user";

import "./App.css";
import { User } from "./store/reducers/user";

function App() {
  const dispath = useDispatch();
  React.useEffect(() => {
    auth.onAuthStateChanged(async (authObj) => {
      if (authObj) {
        const userRef = db.collection("users").doc(authObj.uid);
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
