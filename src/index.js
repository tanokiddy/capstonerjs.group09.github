import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createStore } from "@reduxjs/toolkit";
import { rootReducer } from "./redux/rootReducer";
import { Provider } from "react-redux";
import * as signalR from "@aspnet/signalr";
import { BASE_URL1 } from "./services/configURL";

export const store = createStore(rootReducer);
const root = ReactDOM.createRoot(document.getElementById("root"));

// export const connection = new signalR.HubConnectionBuilder()
//   .withUrl(`${BASE_URL1}/DatVeHub`)
//   .configureLogging(signalR.LogLevel.Information)
//   .build();

// connection
//   .start()
//   .then(() => {
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
// })
// .catch((err) => {
//   console.log(err);
// });
