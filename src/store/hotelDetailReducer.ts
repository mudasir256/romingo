import * as actionTypes from "./actionTypes";
import data from "../static/hotelDetail.js";

export const setHotel = (detail: IHotelDetails) => (dispatch: HotelDetailDispatchType) => {
  // call api to login
  dispatch({
    type: actionTypes.SET_DETAILS,
    detail
  })
}

const initialState: DetailState = {
  detail: data
}

const hotelDetailReducer = (state: DetailState = initialState, action: DetailAction) : DetailState => {
  switch (action.type) {
    case actionTypes.SET_DETAILS:
      return {
        detail: action.detail
      }
    break;
    default:
      return state
  }
}

export default hotelDetailReducer;