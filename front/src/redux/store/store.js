import { createStore, applyMiddleware, compose, combineReducers } from "redux";
// import reducer_1 from '../reducers/reducer' //el reducer
import thunk from "redux-thunk"; //nos ayuda a trabajar con promesas con redux
//import {composeWithDevTools} from 'redux-devtools-extension' //nos ayuda a ver los state de la herramienta

import productReducers from "../reducers/productReducers";
import categoryReducers from "../reducers/categoryReducers";
import cartReducers from "../reducers/cartReducers";
import userReducer from "../reducers/userReducers";
import orderReducer from "../reducers/orderReducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const cartInLocalStorage = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

const rootReducer = combineReducers({
  products: productReducers,
  categories: categoryReducers,
  cart: cartReducers,
  cartInLocalStorage: cartInLocalStorage,
  users: userReducer,
  orders: orderReducer,
});

export const store = createStore(
  rootReducer, // --->>  persistedReducer
  composeEnhancers(applyMiddleware(thunk))
);
