import { auth } from "../../../firebase";
import { Link } from "react-router-dom";

import { useContext } from "react";
import { MessengerContext } from "../../../context/Provider";

import "./Navigation.scss";

const Navigation = () => {
  const { currentUser } = useContext(MessengerContext);

  const logOut = () => {
    const confirmMess = confirm("Are you sure?");
    if (confirmMess) {
      auth.signOut();
    }
  };

  return (
    <div className="navigation">
      <div className="navigation__list">
        <h1 className="navigation__greetings">Welcome, {currentUser?.name}</h1>
        <Link onClick={logOut} to="/login">
          Log Out
        </Link>
      </div>
    </div>
  );
};

export default Navigation;
