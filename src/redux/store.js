import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from '../store';

const persistConfig = {
  key: "romingo",
  storage,
  whitelist: ['searchReducer', 'cityListReducer', 'hotelCheckoutReducer', 'hotelListReducer', 'hotelDetailReducer']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

// const store = createStore(rootReducer, applyMiddleware(thunk));
const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

export { persistor, store };