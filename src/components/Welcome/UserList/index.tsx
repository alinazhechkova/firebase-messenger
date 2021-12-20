import React, { useEffect, useState } from "react";
import { auth, db } from "../../../firebase";

import "./UserList.scss";

const UserList = ({ setUser }: any) => {
  const [users, setUsers] = useState<any>();

  useEffect(() => {
    const users = db
      .collection("users")
      .where("uid", "!=", auth.currentUser!.uid);
    users.onSnapshot({ includeMetadataChanges: true }, (querySnapshot) => {
      let users: any = [];
      querySnapshot.forEach((doc) => users.push(doc.data()));
      setUsers(users);
    });
  }, []);

  return (
    <div className="users-list">
      {users &&
        users.map((user: any) => (
          <div
            key={user.uid}
            className="users-list__item"
            onClick={() => setUser(user)}
          >
            {user.name}
          </div>
        ))}
    </div>
  );
};

export default UserList;
