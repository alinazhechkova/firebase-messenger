import React, { useState } from "react";
import { auth } from "../../../firebase";
import Dialogue from "../Dialogue";
import UserList from "../UserList";

import "./Chat.scss";

const Chat = () => {
  const [user, setUser] = useState(null);
  const [chat, setChat] = useState("");

  return (
    auth.currentUser && (
      <div className="chat__wrap">
        <UserList setUser={setUser} setChat={setChat} chat={chat} />
        <Dialogue user={user} chat={chat} />
      </div>
    )
  );
};

export default Chat;
