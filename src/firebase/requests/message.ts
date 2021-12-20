import firebase from "firebase/compat";
import { collection } from "firebase/firestore";
import { db } from "..";

export type MessageType = {
  title: string;
  senderId: string;
  receiverId: string;
};

const sendMessage = async (receiverId: string, message: MessageType) => {
  const docs = db.collection("chats").doc(receiverId);

  await docs.update({
    messages: firebase.firestore.FieldValue.arrayUnion(message),
  });
};

export default sendMessage;
