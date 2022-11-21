import { configureStore, applyMiddleware, compose } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import reducer from "./root-reducer";

let middlewares = [thunk];

let store;

if (process.env.REACT_APP_REDUX_EXTENSION === "true") {
  store = configureStore(
    { reducer },
    composeWithDevTools(applyMiddleware(...middlewares))
  );
} else {
  store = configureStore(reducer, compose(applyMiddleware(...middlewares)));
}

export default store;
