import { sweetAlert } from "../../helpers/utils";
import axios from 'axios';

export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const CART_RESET = "CART_RESET";
export const CHANGE_PRODUCT_QTY = "CHANGE_PRODUCT_QTY";
export const SET_CART_RELOAD = 'SET_CART_RELOAD';

export const addToCart = (uuid, name, description, stock, image, price, quantity) => async (dispatch, getState) => {
  let old = JSON.parse(localStorage.getItem("cart"));
  if (!old) localStorage.setItem('cart', JSON.stringify([{ uuid, name, description, stock, image, price, quantity }]));
  else {
    let flag = false;
    for (let prod of old) {
      if (prod.uuid === uuid) {
        flag = true;
        quantity = ++prod.quantity
      }
    }
    if (!flag) old.push({ uuid, name, description, stock, image, price, quantity });
  };
  dispatch({ type: ADD_TO_CART, payload: old, });
  localStorage.setItem("cart", JSON.stringify(old));
};

export const setCartReload = (local = JSON.parse(localStorage.getItem("cart") || '[]')) => (dispatch) => {

  dispatch({
    type: SET_CART_RELOAD,
    payload: local
  })
}

export const removeFromCart = (uuid) => (dispatch, getState) => {
  dispatch({
    type: REMOVE_FROM_CART,
    payload: uuid,
  });
  sweetAlert("Eliminado", "success", "OK", 1000);
  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};

export const cartReset = () => (dispatch, getState) => {
  dispatch({
    type: CART_RESET,
    payload: [],
  });
  sweetAlert("Vaciado", "success", "OK", 1000);
  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};

export const changeProductQuantity = (productId, quantity) => (dispatch, getState) => {
  dispatch({ type: CHANGE_PRODUCT_QTY, payload: { productId, quantity } });
  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};

export const goToCheckout = () => (dispatch, getState) => {
  const productsInCart = JSON.parse(localStorage.getItem('cart'));
  return axios.post('/checkout', { productsInCart })
    .then(res => window.location = res.data.init_point)
    .catch(err => console.error(err));
};

export const changeOrderStatus = userId => (dispatch, getState) => {
  const url = window.location.href.slice(window.location.href.indexOf('?'));
  const status = url.slice(url.indexOf('&status') + 1).split('=')[1].split('&')[0];
  if (status === 'approved' || status === 'pending') {
      const products = JSON.parse(localStorage.getItem('cart'));
      axios.post('/user/send-order', {order: products, userId})
      .then(res => {
          dispatch({
              type: "SEND_ORDER_EMAIL",
              order: res.data
          });
      })
      .catch(err => console.log("ERROR ENVIANDO MAIL: ", err));

      const promises = products.map(product => {
          return axios.put('/product/updateStock', {
            form: {...product, stock: product.stock - product.quantity}
          })
          .then(res => console.log(res))
          .catch(err => console.log(err));
      });

      Promise.all(promises)
      .then(res => {
          return axios.put(`/checkout/${userId}`, {status})
          .then(response => {
              dispatch({
                  type: "CHANGE_ORDER_STATUS",
                  order: response.data
              });
              window.location.search = window.location.search.split('?')[0];
              localStorage.removeItem('cart');
          })
      })
      .catch(err => console.log('SE PUDRIÓ TODO'));
  } else {
      return axios.put(`/checkout/${userId}`, {status})
      .then(res => {
      dispatch({
          type: "CHANGE_ORDER_STATUS",
          order: res.data
      });
      window.location.search = window.location.search.split('?')[0];
      localStorage.removeItem('cart');
      })
      .catch(err => console.log(err));
  };

}