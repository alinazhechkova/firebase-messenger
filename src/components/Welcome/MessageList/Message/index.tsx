import React, { useRef } from "react";
import { auth } from "../../../../firebase";

import "./Message.scss";

const Message = ({ message }: any) => {
  const currentUser = auth.currentUser;
  const isIn = message.senderId !== currentUser?.uid;

  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className={`message-container ${isIn ? "is-in" : "is-out"}`}>
      <div className="message-content">
        {isIn && <div className="user-avatar-container"></div>}
        {message.title}
        <div className={`message-content-container`} ref={contentRef}></div>
      </div>
    </div>
  );
};

export default Message;
