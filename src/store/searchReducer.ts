import * as actionTypes from "./actionTypes";

export function saveSearch(search: ISearch) {
	const action: SearchAction = {
		type: actionTypes.SAVE_SEARCH,
		search
	}

	return simulateHttpRequest(action)
}

export function removeArticle(search: ISearch) {
	const action: SearchAction = {
		type: actionTypes.REMOVE_SEARCH,
		search,
	}
	return simulateHttpRequest(action)
}

export function simulateHttpRequest(action: SearchAction) {
	return (dispatch: SearchDispatchType) => {
		setTimeout(() => {
			dispatch(action)
		}, 500)
	}
}

const initialState: SearchState = {
	search: {
		city: "San Francisco",
		checkIn: "8/1/2021",
		checkOut: "8/11/2021",
		occupants: {
			adults: 1,
			children: 1,
			dogs: 1
		}
	}
}

const searchReducer = (state: SearchState = initialState, action: SearchAction): SearchState => {
	switch (action.type) {
		case actionTypes.SAVE_SEARCH:
			return {search: action.search}
	}
	return state;
}

export default searchReducer;