import React, { useEffect, useState } from "react";
import { auth, db } from "../../../firebase";
import { collection, where, query, onSnapshot } from "firebase/firestore";

import "./UserList.scss";
import { useDispatch } from "react-redux";
import { setUser } from "../../../store/actions/message";

const UserList = () => {
  const [users, setUsers] = useState<any>();

  const dispatch = useDispatch();

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
            onClick={() => {
              dispatch(setUser(user));
              console.log(user);
            }}
          >
            {user.login}
          </div>
        ))}
    </div>
  );
};

export default UserList;
