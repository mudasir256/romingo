import * as actionTypes from "./actionTypes";
import TagManager from "react-gtm-module";

export const setHotel =
  (detail: IHotelDetails) => (dispatch: HotelDetailDispatchType) => {
    TagManager.dataLayer({
      dataLayer: {
        event: "selectProperty",
        propertyName: detail.name,
        lowestPropertyPrice: detail.lowestAveragePrice,
      },
    });
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
