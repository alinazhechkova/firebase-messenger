import React, { useEffect, useState } from "react";
import { auth, db } from "../../../firebase";
import { collection, where, query, onSnapshot } from "firebase/firestore";

const ChatList = () => {
  const [users, setUsers] = useState<any>();

  useEffect(() => {
    const users = collection(db, "users");
    const q = query(users, where("uid", "not-in", [auth.currentUser!.uid]));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let users: any = [];
      querySnapshot.forEach((doc) => users.push(doc.data()));
      setUsers(users);
    });
    return () => unsub();
  }, []);

  return <div></div>;
};

export default ChatList;
