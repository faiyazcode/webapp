// src/store.js
import { createStore, combineReducers } from 'redux';
// import contactReducer from './reducers/contactReducer';
import contactReducer from "../reducers/contactReducer"

const rootReducer = combineReducers({
  contact: contactReducer,
});

const store = createStore(rootReducer);

export default store;
