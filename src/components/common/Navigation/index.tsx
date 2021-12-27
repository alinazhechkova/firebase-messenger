import { Breadcrumbs } from "@material-ui/core";
import { auth } from "../../../firebase";
import { Link as RouterLink } from "react-router-dom";

import { Link, LinkProps } from "@material-ui/core";
import { refEqual } from "firebase/firestore";
import { usersRef } from "../../../firebase/requests/auth";

interface LinkRouterProps extends LinkProps {
  to: string;
  replace?: boolean;
}

const LinkRouter = (props: LinkRouterProps) => (
  <Link {...props} component={RouterLink as any} />
);

const Navigation = () => {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <LinkRouter underline="hover" color="primary" to="/">
        Home
      </LinkRouter>
      <LinkRouter
        underline="hover"
        color="primary"
        onClick={() => {
          auth.signOut();
        }}
        to="/login"
      >
        Login
      </LinkRouter>
    </Breadcrumbs>
  );
};

export default Navigation;
