const initialState = {
  order: [],
};

export default function productReducers(state = initialState, action) {
  switch (action.type) {
    case "CREATE_ORDER":
      return {
        ...state,
        order: action.payload,
      };
    case "UPDATE_ORDER":
      return {
        ...state,
        order: action.payload,
      };
    default:
      return state;
  }
}
