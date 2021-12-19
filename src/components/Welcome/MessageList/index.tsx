import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../../../firebase";
import { MessageType } from "../../../firebase/requests/message";
import { RootState } from "../../../store/reducers";
import Message from "./Message";

import "./MessageList.scss";

const MessageList = () => {
  const [messageList, setMessageList] = useState<MessageType[]>([]);

  const user = useSelector((state: RootState) => state.message.user);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt"));
    const unsub = onSnapshot(
      q,
      {
        includeMetadataChanges: true,
      },
      (doc) => {
        let messages: any = [];
        doc.forEach((querySnapshot) => {
          messages.push(querySnapshot.data());
        });
        setMessageList(messages);
      }
    );
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
