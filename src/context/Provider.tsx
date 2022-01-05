import React, { createContext, useEffect, useState } from "react";

import firebase from "firebase/compat";
import { auth, db, realtime } from "@/firebase";

export const MessengerContext = createContext<any>(null);

interface Props {
  children: React.ReactNode;
}

const isOfflineForDatabase = {
  state: "offline",
  lastChanged: firebase.database.ServerValue.TIMESTAMP,
};

const isOnlineForDatabase = {
  state: "online",
  lastChanged: firebase.database.ServerValue.TIMESTAMP,
};

export const Provider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentChat, setCurrentChat] = useState("");

  useEffect(() => {
    let userStatusRef: firebase.database.Reference;

    auth.onAuthStateChanged(async (authObj) => {
      if (authObj) {
        userStatusRef = realtime.ref(`/status/${authObj.uid}`);
        const userRef = db.collection("users").doc(authObj.uid);
        userRef.onSnapshot((doc) => {
          const data = doc.data();
          const userData = {
            name: data?.name,
            login: data?.login,
            uid: authObj.uid,
          };
          setCurrentUser(userData);
          realtime.ref(".info/connected").on("value", (snapshot) => {
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
        realtime.ref(".info/connected").off();
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
