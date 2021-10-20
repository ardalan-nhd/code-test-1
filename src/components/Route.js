import React, { memo, useEffect } from "react";
import { Redirect, Route as RRoute, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useUserState } from "../context/user/UserContext";
import { getCachedData } from "../api/CookieManager";

function Route({ authorize, children, ...rest }) {
  const { authorized } = useUserState();
  const token = getCachedData("access_token");

  const { pathname } = useLocation();
  useEffect(() => {
    if (authorized) {
      console.log("yes");
    }
  }, [authorized, token]);

  return (
    <RRoute
      {...rest}
      render={({ location }) => {
        if (authorize && !authorized && pathname !== "/login") {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location },
              }}
            />
          );
        } else if (!authorize && authorized) {
          return (
            <Redirect
              to={{
                pathname: "/dashboard",
                state: { from: location },
              }}
            />
          );
        } else if (pathname === "/") {
          return (
            <Redirect
              to={{
                pathname: "/dashboard",
                state: { from: location },
              }}
            />
          );
        } else {
          return children;
        }
      }}
    />
  );
}

Route.propTypes = {
  authorize: PropTypes.bool,
};

export default memo(Route);
