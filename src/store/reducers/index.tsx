import { combineReducers } from "redux";
import messageReducer from "./messages";
import userReducer from "./user";

export type RootState = ReturnType<typeof reducers>;

const reducers = userReducer;

export default reducers;
