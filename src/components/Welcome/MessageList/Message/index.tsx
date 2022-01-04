import React from "react";

import { auth } from "../../../../firebase";

import moment from "moment";

import "./Message.scss";

interface Props {
  message: MessageType;
}

const Message = ({ message }: Props) => {
  const currentUser = auth.currentUser;
  const isIn = message.senderId !== currentUser?.uid;

  return (
    <div className={`message-container ${isIn ? "is-in" : "is-out"}`}>
      <div className="message-content">
        {message.title}
        <div className="message-content-container">
          {moment(message.createdAt.toDate()).format("D MMM HH:MM")}
        </div>
      </div>
    </div>
  );
};

export default Message;
