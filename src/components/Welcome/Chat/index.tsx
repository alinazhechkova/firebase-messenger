import React, { useState } from "react";
import { auth } from "../../../firebase";
import Dialogue from "../Dialogue";
import UserList from "../UserList";

import "./Chat.scss";

const Chat = () => {
  return auth.currentUser ? (
    <div className="chat__wrap">
      <UserList />
      <Dialogue />
    </div>
  ) : (
    <></>
  );
};
export default Chat;
