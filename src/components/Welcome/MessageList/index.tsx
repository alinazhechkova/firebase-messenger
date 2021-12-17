import React, { useEffect, useState } from "react";
import { db } from "../../../firebase";
import { MessageType } from "../../../firebase/requests/message";

const MessageList = ({ user }: any) => {
  const [messageList, setMessageList] = useState<MessageType[]>([]);

  useEffect(() => {
    const q = db.collection("messages").where("receiverId", "==", user!.uid);
    const unsub = q.onSnapshot(
      {
        includeMetadataChanges: true,
      },
      (doc) => {
        let messages: any = [];
        doc.forEach((querySnapshot) => {
          messages.push(querySnapshot.data());
        });
        console.log(messages);
        setMessageList(messages);
      }
    );
    return () => unsub();
  }, []);

  useEffect(() => {
    console.log("hi");
    console.log(user);
  }, [user]);

  return (
    <div className="dialogue__messages">
      {messageList.length
        ? messageList.map((message, index) => (
            <div key={index}>{message.title}</div>
          ))
        : "Write your first message"}
    </div>
  );
};

export default MessageList;
