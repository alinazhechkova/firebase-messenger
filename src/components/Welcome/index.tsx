import React from "react";
import { auth } from "../../firebase";

import { Button } from "@material-ui/core";

import "./Welcome.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducers";

const Welcome = () => {
  const currentUser = useSelector((state: RootState) => state);

  return (
    <div className="welcome-page">
      <div className="container">
        <h3>
          Welcome,
          <span className="welcome-page__user">{currentUser!.name}!</span>
        </h3>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => auth.signOut()}
        >
          Log Out
        </Button>
      </div>
    </div>
  );
};

export default Welcome;
