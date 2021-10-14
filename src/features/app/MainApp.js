import React from "react";
import MainRouter from "../../components/MainRouter";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

const MainApp = () => (
  <>
    <ReactNotification />
    <MainRouter />
  </>
);

export default MainApp;
