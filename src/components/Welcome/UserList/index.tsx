import React, { SetStateAction, useContext, useEffect, useState } from "react";

import { auth, db } from "../../../firebase";

import { MessengerContext } from "../../../Provider";
import { usePresence } from "../../../utils/usePresence";

import { Box } from "@material-ui/core";

import "./UserList.scss";

interface Props {
  setUser: React.Dispatch<SetStateAction<User | null>>;
}

const UserList = ({ setUser }: Props) => {
  const [users, setUsers] = useState<User[]>();

  const { currentUser, setCurrentChat } = useContext<any>(MessengerContext);

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

  const currentChat = (user: User) => {
    setUser(user);
    const id =
      currentUser!.uid > user.uid
        ? `${currentUser!.uid + user.uid}`
        : `${user.uid + currentUser!.uid}`;
    setCurrentChat(id);
  };

  return (
    <div className="users-list">
      <div>
        {users &&
          users.map((user) => (
            <div
              className="user-wrap"
              key={user.uid}
              onClick={() => currentChat(user)}
            >
              <h2>
                {user.name}
                <PresenceDot uid={user.uid} />
              </h2>
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserList;

const PresenceDot = ({ uid }: any) => {
  const presence = usePresence(uid);

  const getText = (presence: any) => {
    if (!presence) {
      return <></>;
    }
    return presence.state === "online" ? (
      <div className="dot_active dot" />
    ) : (
      <div className="dot" />
    );
  };

  return <>{getText(presence)}</>;
};
