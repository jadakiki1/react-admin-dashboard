import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { configurePersistor, configureStore } from "./redux/store/store";
import {PersistGate} from "redux-persist/lib/integration/react"
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

// redux setup
const store = configureStore();
const persistor = configurePersistor(store);
const wrapper = document.getElementById("root")

const root = ReactDOM.createRoot(wrapper);
root.render(
  <Provider store={store}>
    <PersistGate loading={<div/>} persistor={persistor}>
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
  </PersistGate>
  </Provider>,
  wrapper
);

 