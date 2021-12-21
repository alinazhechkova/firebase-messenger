import { Box, Tab, Tabs } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { auth, db } from "../../../firebase";
import { RootState } from "../../../store/reducers";

import "./UserList.scss";

const UserList = ({ setUser, setChat }: any) => {
  const [users, setUsers] = useState<any>();
  const currentUser = useSelector((state: RootState) => state.user);
  const [value, setValue] = useState(0);

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
    setChat(id);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
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
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        variant="scrollable"
        sx={{ borderRight: 1, borderColor: "primary" }}
      >
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
      </Tabs>
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
