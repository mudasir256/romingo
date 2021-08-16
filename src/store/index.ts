import { combineReducers } from 'redux';
import searchReducer from "./searchReducer";
import userReducer from "./userReducer";
import hotelListReducer from "./hotelListReducer";
import hotelDetailReducer from "./hotelDetailReducer";

export default combineReducers({
  searchReducer,
  userReducer,
  hotelListReducer,
  hotelDetailReducer
});