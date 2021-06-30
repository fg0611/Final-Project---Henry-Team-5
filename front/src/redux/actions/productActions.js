export const getProducts = () => {
  return async function (dispatch) {
    const res = await fetch("http://localhost:3001/product");
    const data = await res.json();
    dispatch({ type: "GET_PRODUCTS", payload: data });
  };
};

export const createProduct = (datos) => {
  return async (dispatch) => {
    const res = await fetch("http://localhost:3001/product/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    });
    const resJson = await res.json();
    dispatch({
      type: "POST_PRODUCT",
      payload: resJson,
    });
  };
};

export const findProduct = (uuid) => {
  try {
    return async (dispatch) => {
      const res = await fetch(`http://localhost:3001/product/detail/${uuid}`);
      const resJson = await res.json();
      dispatch({
        type: "GET_PRODUCT",
        payload: resJson,
      });
    };
  } catch (error) {
    console.log(error);
  }
};

export const editProduct = (datos) => {
  return async (dispatch) => {
    const res = await fetch("http://localhost:3001/product/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    });
    const resJson = await res.json();
    dispatch({
      type: "PUT_PRODUCT",
      payload: resJson,
    });
  };
};

export const filterByCategory = (categoryUuid) => async (dispatch) => {
  try {
    const res = await fetch(
      `http://localhost:3001/product/filterByCategory?uuid=${categoryUuid}`
    );
    const resJson = await res.json();
    dispatch({
      type: "GET_PRODUCTS",
      payload: resJson,
    });
  } catch (error) {
    console.log(error);
  }
};

export const searchProducts = (name) => {
  return async (dispatch) => {
    const res = await fetch(
      `http://localhost:3001/product/search?name=${name}`
    );
    const resJson = await res.json();
    dispatch({
      type: "GET_PRODUCTS",
      payload: resJson,
    });
  };
};
