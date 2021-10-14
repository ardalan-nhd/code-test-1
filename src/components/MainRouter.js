import React, { memo } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Switch from "./Switch";
import Route from "./Route";
import { UserProvider } from "../context/user/UserContext";
import { WalletProvider } from "../context/wallet/WalletContext";

const SignInPage = React.lazy(() => import("../features/registration/SignIn"));
const SignUpPage = React.lazy(() => import("../features/registration/SignUp"));
const ForgotPasswordPage = React.lazy(() =>
  import("../features/registration/ForgotPassword")
);
const Intro = React.lazy(() => import("../features/dashboard/Dashboard"));
const WalletsPage = React.lazy(() => import("../features/wallet/Wallet"));

export const routes = [
  {
    path: "/",
    showHeader: true,
    authorize: true,
    showFooter: true,
    showMenu: true,
    component: Intro,
  },
  {
    path: "/login",
    showHeader: false,
    showFooter: false,
    authorize: false,
    component: SignInPage,
  },
  {
    path: "/register",
    showHeader: false,
    showFooter: false,
    authorize: false,
    component: SignUpPage,
  },
  {
    path: "/forgotPassword",
    showHeader: false,
    showFooter: false,
    authorize: false,
    component: ForgotPasswordPage,
  },
  {
    path: "/dashboard",
    showHeader: true,
    authorize: true,
    showFooter: true,
    showMenu: true,
    component: Intro,
  },
  {
    path: "/wallet",
    showHeader: true,
    authorize: true,
    showMenu: true,
    showFooter: true,
    component: WalletsPage,
  },
];

function MainRouter() {
  return (
    <Router>
      <Switch>
        <UserProvider>
          <WalletProvider>
            {routes.map(({ component: Component, ...rest }) => (
              <Route exact {...rest} key={rest.path}>
                <Component />
              </Route>
            ))}
          </WalletProvider>
        </UserProvider>
      </Switch>
    </Router>
  );
}

export default memo(MainRouter);
