import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { auth, db } from "../../../firebase";
import { RootState } from "../../../store/reducers";

import "./UserList.scss";

const UserList = ({ setUser, setChat }: any) => {
  const [users, setUsers] = useState<any>();
  const currentUser = useSelector((state: RootState) => state.user);

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

  const currentChat = (user: any) => {
    setUser(user);
    const id =
      currentUser!.uid > user.uid
        ? `${currentUser!.uid + user.uid}`
        : `${user.uid + currentUser!.uid}`;
    setChat(id);
    console.log(id);
  };

  return (
    <div className="users-list">
      {users &&
        users.map((user: any) => (
          <div
            key={user.uid}
            className="users-list__item"
            onClick={() => currentChat(user)}
          >
            {user.name}
          </div>
        ))}
    </div>
  );
};

export default UserList;
