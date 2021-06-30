const initialState = {
  products: [],
  product: [],
  message: {},
  update: {},
};

export default function productReducers(state = initialState, action) {
  switch (action.type) {
    case "GET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };
    case "POST_PRODUCT":
      return {
        ...state,
        message: action.payload,
      };
    case "GET_PRODUCT":
      return {
        ...state,
        product: action.payload,
      };

    case "PUT_PRODUCT":
      return {
        ...state,
        message: action.payload,
    };

    default:
      return state;
  }
}
