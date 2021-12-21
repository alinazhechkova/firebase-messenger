import React, { useEffect, useState } from "react";

import { db } from "../../../firebase";
import { MessageType } from "../../../firebase/requests/message";
import Message from "./Message";

import "./MessageList.scss";

const MessageList = ({ user, chat }: any) => {
  const [messageList, setMessageList] = useState<MessageType[]>([]);

  useEffect(() => {
    const q = db
      .collection("messages")
      .doc(chat)
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
  }, [chat]);

  return (
    <div className="dialogue__messages">
      {messageList.length
        ? messageList.map((message, index) => {
            console.log(message);
            return <Message key={index} message={message} />;
          })
        : "Write your first message"}
    </div>
  );
};

export default MessageList;
