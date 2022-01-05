import { useEffect, useState } from "react";
import { realtime } from "@/firebase";

type PresenceReference = {
  state: string;
  lastChanged: any;
};

export type PresenceType = PresenceReference | null;

export const usePresence = (uid: string) => {
  const [presence, setPresence] = useState<PresenceType>(null);

  useEffect(() => {
    const userStatusRef = realtime.ref(`/status/${uid}`);
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
