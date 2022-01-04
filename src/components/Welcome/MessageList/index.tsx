import React, { useContext, useEffect, useState } from "react";

import { db } from "../../../firebase";
import Message from "./Message";

import { MessengerContext } from "../../../context/Provider";

import NoMessage from "../../../images/no-search-result.svg";

import "./MessageList.scss";

interface Props {
  user: User;
}

const MessageList = ({ user }: Props) => {
  const [messageList, setMessageList] = useState<MessageType[]>([]);
  const { currentChat } = useContext(MessengerContext);

  useEffect(() => {
    if (user && currentChat) {
      const query = db
        .collection("chats")
        .doc(currentChat)
        .collection("messages")
        .orderBy("createdAt");

      const unsub = query.onSnapshot(
        { includeMetadataChanges: true },
        (doc) => {
          let messages: any = [];
          doc.forEach((qe) => {
            messages.push(qe.data());
          });
          setMessageList(messages);
        }
      );

      return () => unsub();
    }
  }, [currentChat]);

  return (
    <div className="dialogue__messages messages">
      {messageList.length ? (
        <div className="messages__list">
          {messageList.map((message, index) => (
            <Message key={index} message={message} />
          ))}
        </div>
      ) : (
        <div className="messages__no-message">
          <img src={NoMessage} alt="no messages" />
        </div>
      )}
    </div>
  );
};

export default MessageList;
