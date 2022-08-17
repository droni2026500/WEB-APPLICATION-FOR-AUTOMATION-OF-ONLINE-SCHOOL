import React, { createContext } from "react";
import App from "./App";
import ReactDom from "react-dom/client";
import Store from "./store/store";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/header/Header";

const store = new Store();

export const Context = createContext({
  store,
});

const root = ReactDom.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Context.Provider value={{ store }}>
      <Header />
      <App />
    </Context.Provider>
  </BrowserRouter>
);
