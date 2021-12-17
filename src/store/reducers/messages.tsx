import { Action } from "redux";
import { MessageType } from "../../firebase/requests/message";
import { User } from "./user";

const defaultState = {
  user: null,
  messages: null,
};

interface Statetype {
  user: User;
  messages: MessageType;
}

type messageType = Statetype | typeof defaultState;

const messageReducer = (state: messageType = defaultState, action: any) => {
  switch (action.type as string) {
    case "SET_USER":
      state!.user = action.user;
      return state;
    default:
      return state;
  }
};

export default messageReducer;
