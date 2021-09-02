import * as actionTypes from "./actionTypes";
import { authService } from "../services/authService.js";
import data from "../static/hotelList.js";

export const setList = (listHotels: IHotel[]) => (dispatch: HotelListDispatchType) => {
  // call api to login
  dispatch({
    type: actionTypes.SET_LIST,
    hotels: listHotels
  })
}

const initialState: HotelListState = {
  hotels: []
}

const hotelListReducer = (state: HotelListState = initialState, action: HotelAction) : HotelListState => {
  switch (action.type) {
    case actionTypes.SET_LIST:
      return {
        hotels: action.hotels
      }
    break;
    default:
      return state
  }
}

export default hotelListReducer;