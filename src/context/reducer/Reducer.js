import { USER_LOGIN, USER_LOGOUT, USER_FETCH } from "../action/UserAction";
import { cacheData, clearCache } from "../../api/CookieManager";

export const initState = {
  token: null,
  wallet: null,
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case USER_LOGIN.SUCCESS:
      cacheData("access_token", action?.payload?.token);
      return {
        ...state,
        token: action.payload.token,
      };

    case USER_LOGOUT.SUCCESS: {
      clearCache("access_token");
      return {
        ...state,
        token: null,
      };
    }

    default:
      return state;
  }
};
const walletReducer = (state = initState, action) => {
  switch (action.type) {
    case USER_LOGIN.SUCCESS:
      cacheData("access_token", action?.payload?.token);
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
      };

    case USER_LOGOUT.SUCCESS: {
      clearCache("access_token");
      return {
        ...state,
        token: null,
      };
    }

    default:
      return state;
  }
};
export { userReducer, walletReducer };
