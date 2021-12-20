import { User } from "../reducers/user";

export const setUser = (user: User) => ({
  type: "SET_USER",
  user,
});

export const clearUser = () => {
  return {
    type: "CLEAR_USER",
  };
};
