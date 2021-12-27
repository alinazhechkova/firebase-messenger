import React, { useContext, useEffect, useState } from "react";

import { db } from "../../../firebase";
import { MessageType } from "../../../firebase/requests/message";
import Message from "./Message";

import { MessengerContext } from "../../../Provider";
import { User } from "../Dialogue";

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
      const q = db
        .collection("messages")
        .doc(currentChat!)
        .collection("chat")
        .orderBy("createdAt");
      const unsub = q.onSnapshot({ includeMetadataChanges: true }, (doc) => {
        let messages: any = [];
        doc.forEach((qe) => {
          messages.push(qe.data());
        });
        setMessageList(messages);
      });

      return () => unsub();
    }
  }, [currentChat]);

  return (
    <div className="dialogue__messages">
      {messageList.length ? (
        messageList.map((message, index) => (
          <Message key={index} message={message} />
        ))
      ) : (
        <img src={NoMessage} alt="no messages" />
      )}
    </div>
  );
};

export default MessageList;
