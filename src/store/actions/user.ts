import { User } from "../reducers/user";

export const setCurrentUser = (user: any) => {
  return {
    type: "setCurrentUser",
    user,
  };
};
