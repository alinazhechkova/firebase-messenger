import { Breadcrumbs } from "@material-ui/core";
import { auth } from "../../../firebase";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/reducers";

const Navigation = () => {
  const currentUser = useSelector((state: RootState) => state);

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link to="/">Home</Link>
      <Link onClick={() => auth.signOut()} to="/login">
        Login
      </Link>
    </Breadcrumbs>
  );
};

export default Navigation;
