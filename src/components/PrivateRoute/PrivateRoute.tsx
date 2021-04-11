import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthContext } from "../../App";

interface Props {
  path: string;
  exact?: boolean;
}

export const PrivateRoute: React.FC<Props> = ({ path, exact, children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated) {
    return (
      <Route path={path} exact={exact}>
        {children}
      </Route>
    );
  }

  return <Redirect to={{ pathname: "/sign-in" }} />;
};
