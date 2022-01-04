import { auth } from "../../../firebase";
import { Link } from "react-router-dom";

import { useContext } from "react";
import { MessengerContext } from "../../../Provider";

import "./Navigation.scss";

const Navigation = () => {
  const { currentUser } = useContext(MessengerContext);

  return (
    <div className="navigation">
      <div className="navigation__list">
        <Link to="/">Home</Link>
        <Link onClick={() => auth.signOut()} to="/login">
          Login
        </Link>
      </div>
      <div className="navigation__greetings">Welcome, {currentUser?.name}</div>
    </div>
  );
};

export default Navigation;
