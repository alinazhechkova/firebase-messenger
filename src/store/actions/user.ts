import { User } from "../reducers/user";

export const setCurrentUser = (user: any) => {
  return {
    type: "SET_CURRENT_USER",
    user,
  };
};
