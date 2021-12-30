import React, { SetStateAction, useContext, useEffect, useState } from "react";

import { auth, db } from "../../../firebase";

import { MessengerContext } from "../../../Provider";

import { Box, Tab, Tabs } from "@material-ui/core";

import "./UserList.scss";

interface Props {
  setUser: React.Dispatch<SetStateAction<User | null>>;
}

const UserList = ({ setUser }: Props) => {
  const [users, setUsers] = useState<User[]>();
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const { currentUser, setCurrentChat } = useContext<any>(MessengerContext);

  useEffect(() => {
    const users = db
      .collection("users")
      .where("uid", "!=", auth.currentUser!.uid);
    const unsub = users.onSnapshot(
      { includeMetadataChanges: true },
      (querySnapshot) => {
        let users: any = [];
        querySnapshot.forEach((doc) => users.push(doc.data()));
        setUsers(users);
      }
    );

    return () => unsub();
  }, []);

  const currentChat = (user: User) => {
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
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: 224,
      }}
    >
      <div>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          //@ts-ignore
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          {users &&
            users.length &&
            users.map((user, index) => (
              <Tab
                key={user.uid}
                label={user.name}
                onClick={() => currentChat(user)}
                {...a11yProps(index)}
              />
            ))}
        </Tabs>
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
