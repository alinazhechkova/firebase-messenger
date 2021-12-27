/// <reference types="vite/client" />

interface User {
  uid: string;
  name: string;
  login: string;
}

interface MessageType {
  title: string;
  senderId: string;
  receiverId: string;
  createdAt: any;
}
