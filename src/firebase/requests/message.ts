import { collection } from "firebase/firestore";
import { db } from "..";

export type MessageType = {
  title: string;
  senderId: string;
  receiverId: string;
};

const sendMessage = async (message: MessageType) => {
  await db.collection("messages").add(message);
};

export default sendMessage;
