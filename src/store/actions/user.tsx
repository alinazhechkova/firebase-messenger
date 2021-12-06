export const setCurrentUser = (user: any) => {
  return {
    type: "setCurrentUser",
    user,
  };
};
