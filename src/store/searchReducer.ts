import * as actionTypes from "./actionTypes";
import TagManager from "react-gtm-module";

export const saveSearch = (search: ISearch) => {
  TagManager.dataLayer({
    dataLayer: {
      event: "search", // event name declared during initialization
      cityId: search.city,
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      adults: search.occupants.adults,
      children: search.occupants.children,
      dogs: search.occupants.dogs,
    },
  });
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


let checkInDate = ""
let checOutDate = ""
let adultsCount = 0
let dogsCount = 0

if (window.location.href.match(/http[s]?:\/\/[\w|:]+\/details\/.+/gm)) {
   const cdate = new Date()
   checkInDate = (new Date(cdate.setMonth(cdate.getMonth()+1))).toISOString()
   checOutDate = (new Date(cdate.setMonth(cdate.getMonth()+1))).toISOString()
   adultsCount = 0
   dogsCount = 1
}

const cdate = new Date()
export const initialState: SearchState = {
  search: {
    city: "",
    checkIn: checkInDate,
    checkOut: checOutDate,
    occupants: {
      adults: adultsCount,
      children: 0,
      dogs: dogsCount,
    },
  },
};



// export const initialState: SearchState = {
//   search: {
//     city: "",
//     checkIn: "",
//     checkOut: "",
//     occupants: {
//       adults: 0,
//       children: 0,
//       dogs: 0,
//     },
//   },
// };

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
