import React, { useEffect, useState } from "react";
import { Button, TextField } from "@material-ui/core";

import { auth } from "../../../firebase";
import sendMessage from "../../../firebase/requests/message";

import { useDispatch } from "react-redux";
import { clearUser } from "../../../store/actions/message";
import MessageList from "../MessageList";
import firebase from "firebase/compat";

import "./Dialogue.scss";

const Dialogue = ({ user }: any) => {
  const dispath = useDispatch();
  const senderId: string = auth.currentUser!.uid;

  const [text, setText] = useState("");

  return (
    <div className="dialogue">
      {user ? (
        <>
          <button
            className="dialogue__close-btn"
            onClick={() => dispath(clearUser())}
          >
            X
          </button>
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
                  sendMessage(user.uid, message);
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
              <Button type="submit">Send</Button>
            </form>
          </div>
        </>
      ) : (
        <>Choose friend to write</>
      )}
    </div>
  );
};

export default Dialogue;
