import React, { createContext, useEffect, useState } from "react";

import { auth, db } from "./firebase/";

export const MessengerContext = createContext<any>(null);

interface Props {
  children: React.ReactNode;
}

export const Provider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentChat, setCurrentChat] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged(async (authObj) => {
      if (authObj) {
        const userRef = db.collection("users").doc(authObj.uid);
        userRef.onSnapshot((doc) => {
          const data = doc.data();
          const userData = {
            name: data?.name,
            login: data?.login,
            uid: authObj.uid,
          };
          setCurrentUser(userData);
        });
      } else {
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
