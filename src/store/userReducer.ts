import * as actionTypes from "./actionTypes";
import { authService } from "../services/authService.js"

interface LoginInfo {
  email: string;
  password: string;
}

export const loginUser = (userData: LoginInfo) => async (dispatch: UserDispatchType) => {
  // call api to login

  const res = {
    token: userData.id,
    id: userData.id,
    email: userData.email
  };

  authService.setCredentials(res, res.token);
  dispatch({
    type: actionTypes.SET_USER,
    user: res
  })
}

export const logoutUser = () => async (dispatch: UserDispatchType) => {
  authService.logout()
  authService.setCredentials('', '')
  dispatch({
    type: actionTypes.SET_UNAUTHENTICATED
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