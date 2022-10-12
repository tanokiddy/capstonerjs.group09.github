import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import movieReducer from "./movieReducer";
import spinnerReducer from "./spinnerReducer";
export const rootReducer = combineReducers({
  userReducer,
  movieReducer,
  spinnerReducer,
});
