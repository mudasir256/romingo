import * as actionTypes from "./actionTypes";

export const setHotel = (detail: IHotelDetails) => (
  dispatch: HotelDetailDispatchType
) => {
  // call api to login
  dispatch({
    type: actionTypes.SET_DETAILS,
    detail,
  });
};

const initialState: DetailState = {
  detail: {
    name: "",
    mainImg: "",
    location: { lat: "", lon: "", address: "" },
    gallery: [],
    score: 0,
    dogAmenitiesTitle: "",
    roomList: [],
    amenitiesTitle: "",
    nearby: [],
    rooms: [],
  },
};

const hotelDetailReducer = (
  state: DetailState = initialState,
  action: DetailAction
): DetailState => {
  switch (action.type) {
    case actionTypes.SET_DETAILS:
      return {
        detail: action.detail,
      };
      break;
    default:
      return state;
  }
};

export default hotelDetailReducer;
