import * as actionTypes from "./actionTypes";

export const setViewStatus = (status: IViewStatus) => (dispatch: ViewStatusDispatchType) => {
  // call api to login
  dispatch({
    type: actionTypes.SET_VIEW_METHOD,
    status
  })
}

const initialState: IViewStatus = {
  status: "expanded"
}

const viewStatusReducer = (state: IViewStatus = initialState, action: ViewStatusAction) : IViewStatus => {
  switch (action.type) {
    case actionTypes.SET_VIEW_METHOD:
      return {
        status: action.status.status
      }
    break;
    default:
      return state
  }
}

export default viewStatusReducer;