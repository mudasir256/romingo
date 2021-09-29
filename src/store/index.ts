import { combineReducers } from "redux";
import searchReducer from "./searchReducer";
import userReducer from "./userReducer";
import hotelListReducer from "./hotelListReducer";
import hotelDetailReducer from "./hotelDetailReducer";
import hotelCheckoutReducer from "./hotelCheckoutReducer";
import cityListReducer from "./cityListReducer";
import viewStatusReducer from "./viewStatusReducer";

export default combineReducers({
  searchReducer,
  userReducer,
  hotelListReducer,
  hotelDetailReducer,
  hotelCheckoutReducer,
  cityListReducer,
  viewStatusReducer
});
