export type User = {
  login: string;
  name: string;
  uid: string;
};

const userReducer = (state: User | null = null, action: any) => {
  switch (action.type) {
    case "setCurrentUser":
      state = action.user;
      return state;
    default:
      return state;
  }
};

export default userReducer;
