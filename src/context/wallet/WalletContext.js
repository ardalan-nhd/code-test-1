// import userApi from "../helper/user";
import React, { useEffect, useReducer, createContext } from "react";
import { initState, userReducer } from "../reducer/Reducer";
import { getCachedData } from "../../api/CookieManager";
import { USER_FETCH } from "../action/UserAction";

const WalletDispatchContext = createContext();
const WalletStateContext = createContext();

function WalletProvider(props) {
  const { children } = props;
  const token = getCachedData("access_token");
  const wallet = getCachedData("wallet");
  const [state, dispatch] = useReducer(userReducer, {
    ...initState,
    token,
    wallet,
    authorized: !!token ? true : false,
  });

  //   useEffect(() => {
  //     if (!!token) {
  //       userApi
  //         .getUserInfo({ payload: user })
  //         .then((content) => {
  //           dispatch({
  //             type: USER_FETCH.SUCCESS,
  //             payload: { user: content.data },
  //           });
  //         })
  //         .catch((error) => {
  //           error
  //             ? console.log(error?.data?.message)
  //             : console.log("There is a problem");
  //         });
  //     }
  //   }, [token]);

  return (
    <WalletStateContext.Provider value={state}>
      <WalletDispatchContext.Provider value={dispatch}>
        {children}
      </WalletDispatchContext.Provider>
    </WalletStateContext.Provider>
  );
}

function useWalletState() {
  const context = React.useContext(WalletStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}
function useWalletDispatch() {
  const context = React.useContext(WalletDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}
export { WalletProvider, useWalletState, useWalletDispatch };
