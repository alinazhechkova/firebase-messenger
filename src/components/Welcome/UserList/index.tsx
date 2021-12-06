import React, { useEffect, useState } from "react";
import { auth, db } from "../../../firebase";
import { collection, where, query, onSnapshot } from "firebase/firestore";

import "./UserList.scss";

interface Props {
  setUser: (user: any) => void;
}

const UserList = ({ setUser }: Props) => {
  const [users, setUsers] = useState<any>();

  useEffect(() => {
    const users = collection(db, "users");
    const q = query(users, where("uid", "not-in", [auth.currentUser!.uid]));
    const unsub = onSnapshot(
      q,
      { includeMetadataChanges: true },
      (querySnapshot) => {
        let users: any = [];
        querySnapshot.forEach((doc) => users.push(doc.data()));
        setUsers(users);
      }
    );
    return () => unsub();
  }, []);

  return (
    <div className="user-list">
      {users &&
        users.map((user: any) => (
          <div
            key={user.uid}
            className="chat-user"
            onClick={() => setUser(user)}
          >
            {user.name}
          </div>
        ))}
    </div>
  );
};

export default UserList;
