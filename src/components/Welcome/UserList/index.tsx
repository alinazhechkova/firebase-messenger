import React, { useContext, useEffect, useState } from "react";

import { Box, Tab } from "@material-ui/core";
import { useSelector } from "react-redux";
import { auth, db } from "../../../firebase";
import { RootState } from "../../../store/reducers";

import "./UserList.scss";
import { MessengerContext } from "../../../Provider";

const UserList = ({ setUser }: any) => {
  const [users, setUsers] = useState<any>();

  const { currentUser, setCurrentChat } = useContext<any>(MessengerContext);

  useEffect(() => {
    const users = db
      .collection("users")
      .where("uid", "!=", auth.currentUser!.uid);
    users.onSnapshot({ includeMetadataChanges: true }, (querySnapshot) => {
      let users: any = [];
      querySnapshot.forEach((doc) => users.push(doc.data()));
      setUsers(users);
    });
  }, []);

  const currentChat = (user: any) => {
    setUser(user);
    const id =
      currentUser!.uid > user.uid
        ? `${currentUser!.uid + user.uid}`
        : `${user.uid + currentUser!.uid}`;
    setCurrentChat(id);
  };

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        display: "flex",
        height: 500,
        width: 300,
      }}
    >
      <div>
        {users &&
          users.length &&
          users.map((user: any, index: number) => (
            <Tab
              key={user.uid}
              label={user.name}
              onClick={() => currentChat(user)}
              {...a11yProps(index)}
            />
          ))}
      </div>
    </Box>
  );
};

export default UserList;

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}
