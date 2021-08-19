import { combineReducers } from "redux";
import searchReducer from "./searchReducer";
import userReducer from "./userReducer";
import hotelListReducer from "./hotelListReducer";
import hotelDetailReducer from "./hotelDetailReducer";
import hotelCheckoutReducer from "./hotelCheckoutReducer";

export default combineReducers({
  searchReducer,
  userReducer,
  hotelListReducer,
  hotelDetailReducer,
  hotelCheckoutReducer,
});
