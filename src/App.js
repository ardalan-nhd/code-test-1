import React from "react";
import { StylesProvider } from "@mui/styles";
import MainApp from "./features/app/MainApp";
import CssBaseline from "@mui/material/CssBaseline";

const App = () => {
  return (
    <div dir="rtl">
      <StylesProvider>
        <CssBaseline />
        <MainApp />
      </StylesProvider>
    </div>
  );
};

export default App;
