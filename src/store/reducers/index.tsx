import { combineReducers } from "redux";
import messageReducer from "./messages";
import userReducer from "./user";

export type RootState = {
  user: ReturnType<typeof userReducer>;
  message: ReturnType<typeof messageReducer>;
};

const reducers = combineReducers({
  user: userReducer,
  message: messageReducer,
});

export default reducers;
