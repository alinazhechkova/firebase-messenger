import React, { useState } from "react";

import { auth } from "../../../firebase";

import Dialogue, { User } from "../Dialogue";
import UserList from "../UserList";

import "./Chat.scss";

const Chat = () => {
  const [user, setUser] = useState<User | null>(null);

  return (
    auth.currentUser && (
      <div className="chat__wrap">
        <UserList setUser={setUser} />
        <Dialogue user={user} />
      </div>
    )
  );
};

export default Chat;
