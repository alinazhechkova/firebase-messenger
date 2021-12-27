export const setChat = (chat: string) => ({
  type: "SET_CHAT",
  chat,
});

export const clearChat = () => {
  return {
    type: "CLEAR_CHAT",
  };
};
