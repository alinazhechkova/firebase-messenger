import React, { useContext, useState } from "react";
import { Button, IconButton, TextField } from "@material-ui/core";

import { auth } from "../../../firebase";
import sendMessage from "../../../firebase/requests/message";

import MessageList from "../MessageList";
import firebase from "firebase/compat";

import NoMessages from "../../../images/noSelectedMessages.svg";

import "./Dialogue.scss";
import { RootState } from "../../../store/reducers";
import { MessengerContext } from "../../../Provider";

const Dialogue = ({ user }: any) => {
  const { currentChat, setCurrentChat } = useContext(MessengerContext);

  const senderId: string = auth.currentUser!.uid;

  const [text, setText] = useState("");

  return (
    <div className="dialogue">
      {user && currentChat ? (
        <>
          <IconButton onClick={() => setCurrentChat("")}>X</IconButton>
          <MessageList user={user} />
          <div className="dialogue__form">
            <form
              action="#"
              onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                if (text.trim()) {
                  const message = {
                    title: text,
                    senderId,
                    receiverId: user.uid,
                    createdAt: firebase.firestore.Timestamp.now(),
                  };
                  sendMessage(currentChat, message);
                  setText("");
                }
              }}
            >
              <TextField
                fullWidth
                label="Enter your message"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setText(e.target.value)
                }
                value={text}
              />
              <Button variant="contained" type="submit" color="primary">
                Send
              </Button>
            </form>
          </div>
        </>
      ) : (
        <img src={NoMessages} alt="no messages" />
      )}
    </div>
  );
};

export default Dialogue;
