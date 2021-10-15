// import userApi from "../helper/user";
import React, { useEffect, useReducer, createContext } from "react";
import { initState, userReducer } from "../reducer/Reducer";
import { getCachedData } from "../../api/CookieManager";
import { USER_FETCH } from "../action/UserAction";

const UserDispatchContext = createContext();
const UserStateContext = createContext();

function UserProvider(props) {
  const { children } = props;
  const token = getCachedData("access_token");
  const [state, dispatch] = useReducer(userReducer, {
    ...initState,
    token,
    authorized: !!token ? true : false,
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  const context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}
function useUserDispatch() {
  const context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}
export { UserProvider, useUserState, useUserDispatch };
