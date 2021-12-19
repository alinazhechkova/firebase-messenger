import React, { useEffect, useState } from "react";
import { Button, TextField } from "@material-ui/core";

import { auth, db } from "../../../firebase";
import sendMessage from "../../../firebase/requests/message";

import "./Dialogue.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/reducers";
import { setUser } from "../../../store/actions/message";
import MessageList from "../MessageList";
import firebase from "firebase/compat";

const Dialogue = () => {
  const user = useSelector((state: RootState) => state.message.user);
  const dispath = useDispatch();
  const senderId: string = auth.currentUser!.uid;

  const [text, setText] = useState("");

  return (
    <div className="dialogue">
      <button
        className="dialogue__close-btn"
        onClick={() => dispath(setUser(null))}
      >
        X
      </button>
      {user ? (
        <>
          <MessageList />
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
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                  };
                  sendMessage(message);
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
