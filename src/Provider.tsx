import firebase from "firebase/compat";
import React, { createContext, useEffect, useState } from "react";

import { auth, db } from "./firebase/";
import {
  isOfflineForDatabase,
  isOnlineForDatabase,
} from "./firebase/requests/auth";

export const MessengerContext = createContext<any>(null);

interface Props {
  children: React.ReactNode;
}

export const Provider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentChat, setCurrentChat] = useState("");

  useEffect(() => {
    let userStatusRef: firebase.database.Reference;
    let userRef: firebase.firestore.DocumentReference;
    auth.onAuthStateChanged(async (authObj) => {
      if (authObj) {
        userStatusRef = firebase.database().ref(`/status/${authObj.uid}`);
        userRef = db.collection("users").doc(authObj.uid);
        userRef.onSnapshot((doc) => {
          const data = doc.data();
          const userData = {
            name: data?.name,
            login: data?.login,
            uid: authObj.uid,
          };
          setCurrentUser(userData);
          firebase
            .database()
            .ref(".info/connected")
            .on("value", (snapshot) => {
              if (snapshot.val() === false) {
                return;
              }
              userStatusRef
                .onDisconnect()
                .set(isOfflineForDatabase)
                .then(() => {
                  userStatusRef.set(isOnlineForDatabase);
                });
            });
        });
      } else {
        if (userStatusRef) {
          userStatusRef.off();
        }
        firebase.database().ref(".info/connected").off();
        setCurrentUser(null);
      }
    });
  }, []);

  const value = { currentUser, currentChat, setCurrentChat };

  return (
    <MessengerContext.Provider value={value}>
      {children}
    </MessengerContext.Provider>
  );
};
