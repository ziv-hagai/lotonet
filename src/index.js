import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import reportWebVitals from "./reportWebVitals";
// import Context from "./context/Context";
import "../src/components/language/i18";
import store from "./redux/store";
import App from "./App";

import "./index.css";

ReactDOM.render(
  <Suspense fallback="...">
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </Suspense>,
  document.getElementById("root")
);

reportWebVitals();
