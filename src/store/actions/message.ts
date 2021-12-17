import { User } from "../reducers/user";

export const setUser = (user: User | null) => {
  return {
    type: "SET_USER",
    user,
  };
};
