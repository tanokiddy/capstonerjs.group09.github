import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import movieReducer from "./movieReducer";

export const rootReducer = combineReducers({
  userReducer,
  movieReducer,
});
