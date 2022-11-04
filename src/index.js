import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { applyMiddleware, createStore } from "@reduxjs/toolkit";
import { rootReducer } from "./redux/rootReducer";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

export const store = createStore(rootReducer, applyMiddleware(thunk));
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
