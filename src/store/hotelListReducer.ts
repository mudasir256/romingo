import * as actionTypes from "./actionTypes";

const initialState: HotelListState = {
  hotels: [],
};

export const setList = (listHotels: IHotel[]) => (
  dispatch: HotelListDispatchType
) => {
  // call api to login
  dispatch({
    type: actionTypes.SET_LIST,
    hotels: listHotels,
  });
};

const hotelListReducer = (
  state: HotelListState = initialState,
  action: HotelAction
): HotelListState => {
  switch (action.type) {
    case actionTypes.SET_LIST:
      return {
        hotels: action.hotels,
      };
      break;
    default:
      return state;
  }
};

export default hotelListReducer;
