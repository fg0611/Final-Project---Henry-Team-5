import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import axios from "axios";
import { store } from "./redux/store/store";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./themeConfig.js";
import dotenv from "dotenv";
import App from "./App";
dotenv.config();

axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001";

if (!localStorage.cart){
  localStorage.setItem("cart", JSON.stringify([]));
} else {
  localStorage.setItem("cart", localStorage.getItem("cart"));
}

ReactDom.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);
