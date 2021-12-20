import React, { useEffect, useState } from "react";

import { db } from "../../../firebase";
import { MessageType } from "../../../firebase/requests/message";
import Message from "./Message";

import "./MessageList.scss";

const MessageList = ({ user }: any) => {
  const [messageList, setMessageList] = useState<MessageType[]>([]);

  useEffect(() => {
    const q = db.collection("chats").where("id", "==", user.uid);
    const unsub = q.onSnapshot({ includeMetadataChanges: true }, (doc) => {
      console.log();
      doc.forEach((qe) => {
        let messages: any = [];
        messages.push(qe.data());
        setMessageList(qe.data().messages);
      });
    });
    return () => unsub();
  }, []);

  return (
    <div className="dialogue__messages">
      {messageList.length
        ? messageList.map((message, index) => (
            <Message key={index} message={message} />
          ))
        : "Write your first message"}
    </div>
  );
};

export default MessageList;
