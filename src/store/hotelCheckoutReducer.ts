import * as actionTypes from "./actionTypes";
import TagManager from "react-gtm-module";

export const setCheckout =
  (checkout: ICheckout) => (dispatch: CheckoutDispatchType) => {
    TagManager.dataLayer({
      dataLayer: {
        event: "selectRoom",
        roomValue: checkout.room.value,
        feesIncluded: checkout.room.room.feesIncluded,
        averagePrice: checkout.room.room.averagePrice,
        totalPriceAfterTax: checkout.room.room.totalPriceAfterTax,
        cancelDeadline: checkout.room.room.cancelationPolicy.deadlineLocal,
      },
    });
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
