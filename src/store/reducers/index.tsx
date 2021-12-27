export type RootState = {
  currentUser: User | null;
  currentChat: string;
};

export type User = {
  login: string;
  name: string;
  uid: string;
};

const defaultState = {
  currentUser: null,
  currentChat: "",
};

const reducer = (state: RootState = defaultState, action: any) => {
  switch (action.type as string) {
    case "SET_CHAT":
      state!.currentChat = action.chat;
      return state;
    case "CLEAR_CHAT":
      state.currentChat = "";
      console.log("h");
      return state;
    case "SET_CURRENT_USER":
      state.currentUser = action.user;
      return state;
    default:
      return state;
  }
};

export default reducer;
