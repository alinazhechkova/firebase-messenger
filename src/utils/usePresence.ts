import firebase from "firebase/compat";
import { useEffect, useState } from "react";

export const usePresence = (uid: string) => {
  const [presence, setPresence] = useState(null);
  useEffect(() => {
    const userStatusRef = firebase.database().ref(`/status/${uid}`);
    userStatusRef.on("value", (snap) => {
      if (snap.exists()) {
        const data = snap.val();
        setPresence(data);
      }
    });
    return () => {
      userStatusRef.off();
    };
  }, [uid]);
  return presence;
};
