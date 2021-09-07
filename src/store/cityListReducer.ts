import * as actionTypes from "./actionTypes";
import data from "../static/cityList.js";

export const setList = (listCities: ICity[]) => (dispatch: CityListDispatchType) => {
  // call api to login
  dispatch({
    type: actionTypes.SET_CITIES,
    cities: listCities
  })
}

const initialState: CityListState = {
  cities: data
}

const cityListReducer = (state: CityListState = initialState, action: CityAction) : CityListState => {
  switch (action.type) {
    case actionTypes.SET_CITIES:
      return {
        cities: action.cities
      }
    break;
    default:
      return state
  }
}

export default cityListReducer;