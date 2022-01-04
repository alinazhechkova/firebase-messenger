import React, { useContext, useState } from "react";

import { auth } from "../../../firebase";
import sendMessage from "../../../firebase/requests/message";

import { MessengerContext } from "../../../context/Provider";

import MessageList from "../MessageList";

import { Button, IconButton, TextField } from "@material-ui/core";
import NoMessages from "../../../images/noSelectedMessages.svg";

import "./Dialogue.scss";

interface Props {
  user: User | null;
}

const Dialogue = ({ user }: Props) => {
  const { currentChat, setCurrentChat } = useContext(MessengerContext);

  const senderId = auth.currentUser!.uid;

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
                    createdAt: new Date(),
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
