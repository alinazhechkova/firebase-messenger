import firebase from "firebase/compat";
import { addDoc, collection } from "firebase/firestore";
import { db } from "..";

export type MessageType = {
  title: string;
  senderId: string;
  receiverId: string;
};

const sendMessage = async (id: string, message: MessageType) => {
  await addDoc(collection(db, "messages", id, "chat"), message);
};

export default sendMessage;
