import * as actionTypes from "./actionTypes";
import { authService } from "../services/authService.js"

interface LoginInfo {
  email: string;
  password: string;
}

export const loginUser = (userData: LoginInfo) => (dispatch: UserDispatchType) => {
  // call api to login
  const res = {
    token: "test token",
    id: "123412341224",
    email: userData.email
  };
  console.log(res);

  authService.setCredentials(res, res.token);
  dispatch({
    type: actionTypes.SET_USER,
    user: res
  })
}

const initialState: UserState = {
  user: {
    token: "",
    id: "",
    email: "",
  },
  authenticated: false
}

const userReducer = (state: UserState = initialState, action: UserAction) : UserState => {
  switch (action.type) {
    case actionTypes.SET_AUTHENTICATED:
      return {
        user: action.user,
        authenticated: true
      }
    break;

    case actionTypes.SET_USER:
      return {
        user: action.user,
        authenticated: true
      }
    break;
    
    case actionTypes.SET_UNAUTHENTICATED:
      return initialState
    break;

    default:
      return state
  }
}

export default userReducer;