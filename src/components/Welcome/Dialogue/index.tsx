import React from "react";
import { Button, TextField } from "@material-ui/core";

import "./Dialogue.scss";

interface Props {
  user: any;
  setUser: (user: any) => void;
}

const Dialogue = ({ user, setUser }: Props) => {
  let messages: any[] = [];

  if (!user) {
    return <div>Choose friend to write</div>;
  }

  return (
    <div className="dialogue">
      <div className="dialogue-messages">
        {messages.length
          ? messages.map((message) => {
              <div>{message.title}</div>;
            })
          : "Write your first message"}
      </div>
      <div className="dialogue-form">
        <TextField fullWidth label="Enter your message" />
        <Button>Send</Button>
      </div>
      <button className="close-dialogue" onClick={() => setUser(null)}>
        X
      </button>
    </div>
  );
};
export default Dialogue;
