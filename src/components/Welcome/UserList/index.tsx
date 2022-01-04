import React, { SetStateAction, useContext, useEffect, useState } from "react";

import { auth, db } from "../../../firebase";

import { MessengerContext } from "../../../context/Provider";

import PresenceDot from "./PresenceDot";

import "./UserList.scss";

interface Props {
  setUser: React.Dispatch<SetStateAction<User | null>>;
}

const UserList = ({ setUser }: Props) => {
  const [users, setUsers] = useState<User[]>();

  const { currentUser, setCurrentChat, currentChat } =
    useContext<any>(MessengerContext);

  useEffect(() => {
    const users = db
      .collection("users")
      .where("uid", "!=", auth.currentUser!.uid);
    const unsub = users.onSnapshot(
      { includeMetadataChanges: true },
      (querySnapshot) => {
        const users: any = [];
        querySnapshot.forEach((doc) => users.push(doc.data()));
        setUsers(users);
      }
    );

    return () => unsub();
  }, []);

  const currentChatHandler = (user: User) => {
    setUser(user);
    const id = getChatId(user.uid);
    setCurrentChat(id);
  };

  const getChatId = (uid: string) => {
    const id =
      currentUser!.uid > uid
        ? `${currentUser!.uid + uid}`
        : `${uid + currentUser!.uid}`;

    return id;
  };

  return (
    <div className="users-list">
      {users &&
        users.map((user) => (
          <div
            className={`user-wrap ${
              getChatId(user.uid) === currentChat ? "user-wrap_active" : ""
            } `}
            key={user.uid}
            onClick={() => currentChatHandler(user)}
          >
            <h2>
              {user.name}
              <PresenceDot uid={user.uid} />
            </h2>
          </div>
        ))}
    </div>
  );
};

export default UserList;
