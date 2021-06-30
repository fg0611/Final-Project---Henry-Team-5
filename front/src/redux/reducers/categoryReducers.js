const initialState = {
  categories: [],
  response: {},
  success: {},
  error: "",
};

export default function categoryReducers(state = initialState, action) {
  switch (action.type) {
    case "GET_CATEGORIES":
      return {
        ...state,
        categories: action.payload,
      };

    case "GET_CATEGORY_BY_NAME":
      return {
        ...state,
        categories: action.payload,
      };

    case "ADD_CATEGORY":
      return {
        ...state,
        success: action.payload,
      };

    case "SUCCESS":
      return {
        ...state,
        success: action.payload,
      };

    case "DELETE_SUCCESS":
      return {
        ...state,
        success: {},
      };

    case "ERROR":
      return {
        ...state,
        error: action.payload,
      };

    case "DELETE_ERROR":
      return {
        ...state,
        error: "",
      };
    default:
      return state;
  }
}
