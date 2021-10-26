import * as actionTypes from "./actionTypes";

export const saveSearch = (search: ISearch) => {
  const action: SearchAction = {
    type: actionTypes.SAVE_SEARCH,
    search,
  };

  return simulateHttpRequest(action);
};

export const removeArticle = (search: ISearch) => {
  const action: SearchAction = {
    type: actionTypes.REMOVE_SEARCH,
    search,
  };
  return simulateHttpRequest(action);
};

export const simulateHttpRequest = (action: SearchAction) => {
  return (dispatch: SearchDispatchType) => {
    // setTimeout(() => {
    dispatch(action);
    // }, 100);
  };
};

export const initialState: SearchState = {
  search: {
    city: "",
    checkIn: "",
    checkOut: "",
    occupants: {
      adults: 0,
      children: 0,
      dogs: 0,
    },
  },
};

const searchReducer = (
  state: SearchState = initialState,
  action: SearchAction
): SearchState => {
  switch (action.type) {
    case actionTypes.SAVE_SEARCH:
      return { search: action.search };
  }
  return state;
};

export default searchReducer;
