import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CART_RESET,
  CHANGE_PRODUCT_QTY,
  SET_CART_RELOAD,
} from "../actions/cartActions";

const initialState = {
  cartItems: JSON.parse(localStorage.getItem('cart') || '[]'),
};

export default function cartReducers(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cartItems: action.payload,
      };
    case SET_CART_RELOAD:
      return {
        ...state,
        cartItems: action.payload
      }
    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((e) => e.uuid !== action.payload),
      };
    case CART_RESET:
      return {
        ...state,
        cartItems: action.payload,
      };
    case CHANGE_PRODUCT_QTY:
      const { productId, quantity } = action.payload;
      return {
        ...state,
        cartItems: state.cartItems.map(product => {
          if(product.uuid === productId) return { ...product, quantity };
          return product;
        }),
      };
    default:
      return state;
  }
}
