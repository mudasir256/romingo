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
      lat: search.lat,
      lng: search.lng,
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
let adultsCount = 2
let dogsCount = 1

const isPropertyPage = (path:string) => {
  if (path.match(/\/hotel\/.*$/gm) || path.match(/\/details\/.*$/gm) ) return true
  return false
}

if (isPropertyPage(window.location.pathname)) {
   const cdate = new Date()
   const odate = new Date()
   const checkInDateIns = (new Date(cdate.setMonth(cdate.getMonth()+1)))
   const checkInOut = (new Date(odate.setMonth(odate.getMonth()+1)))
   checkInOut.setDate(checkInOut.getDate() + 1)
   checkInDate = checkInDateIns.toISOString()
   checOutDate = checkInOut.toISOString()
   adultsCount = 2
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
