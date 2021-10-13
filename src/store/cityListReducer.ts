import * as actionTypes from "./actionTypes";

export const setList = (listCities: ICity[]) => (
  dispatch: CityListDispatchType
) => {
  // call api to login
  dispatch({
    type: actionTypes.SET_CITIES,
    cities: listCities,
  });
};

const initialState: CityListState = {
  cities: [],
};

const cityListReducer = (
  state: CityListState = initialState,
  action: CityAction
): CityListState => {
  switch (action.type) {
    case actionTypes.SET_CITIES:
      return {
        cities: action.cities,
      };
      break;
    default:
      return state;
  }
};

export default cityListReducer;
