import * as actionTypes from "./actionTypes";

export const setCheckout = (checkout: ICheckout) => (
  dispatch: CheckoutDispatchType
) => {
  dispatch({
    type: actionTypes.SET_CHECKOUT,
    checkout,
  });
};

const hotelCheckoutReducer = (
  state: CheckoutState | null = null,
  action: CheckoutAction
): CheckoutState | null => {
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
