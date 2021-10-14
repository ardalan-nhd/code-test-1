import { USER_LOGIN, USER_LOGOUT, USER_FETCH } from "../action/UserAction";
import { cacheData, clearCache } from "../../api/CookieManager";

export const initState = {
  token: null,
  user: null,
  wallet: null,
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case USER_LOGIN.SUCCESS:
      cacheData("access_token", action?.payload?.token);
      cacheData("user", action?.payload?.user);
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
      };

    case USER_LOGOUT.SUCCESS: {
      clearCache("access_token");
      clearCache("user");
      return {
        ...state,
        token: null,
      };
    }
    case USER_FETCH.SUCCESS: {
      return {
        ...state,
        user: action.payload.user,
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
      cacheData("user", action?.payload?.user);
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
      };

    case USER_LOGOUT.SUCCESS: {
      clearCache("access_token");
      clearCache("user");
      return {
        ...state,
        token: null,
      };
    }
    case USER_FETCH.SUCCESS: {
      return {
        ...state,
        user: action.payload.user,
      };
    }

    default:
      return state;
  }
};
export { userReducer, walletReducer };
