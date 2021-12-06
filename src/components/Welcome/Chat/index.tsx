import React, { useState } from "react";
import Dialogue from "../Dialogue";
import UserList from "../UserList";

import "./Chat.scss";

const Chat = () => {
  const [user, setUser] = useState<any>(null);

  return (
    <div className="chat__wrap">
      <UserList setUser={setUser} />
      <Dialogue user={user} setUser={setUser} />
    </div>
  );
};
export default Chat;
