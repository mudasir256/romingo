import * as actionTypes from "./actionTypes";
import { authService } from "../services/authService.js";
import data from "../static/hotelCheckout";

export const setCheckout = (checkout: ICheckout) => (
  dispatch: CheckoutDispatchType
) => {
  dispatch({
    type: actionTypes.SET_CHECKOUT,
    checkout,
  });
};

const initialState: CheckoutState = {
  checkout: data,
};

const hotelCheckoutReducer = (
  state: CheckoutState = initialState,
  action: CheckoutAction
): CheckoutState => {
  switch (action.type) {
    case actionTypes.SET_CHECKOUT:
      return {
        checkout: action.checkout,
      };
      break;
    default:
      return state;
  }
};

export default hotelCheckoutReducer;
