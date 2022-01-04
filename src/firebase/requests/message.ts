import firebase from "firebase/compat";
import { db } from "..";

const sendMessage = async (id: string, message: MessageType) => {
  const messagesRef = db.collection("chats").doc(id).collection("messages");
  await messagesRef.add(message);
};

export default sendMessage;
