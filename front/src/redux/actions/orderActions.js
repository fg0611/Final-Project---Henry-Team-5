export const createOrder = (data) => {
  //const { userName, products } = req.body;
  //orderState
  //products es un arreglo de objetos
  // [ { name, qty }, { name, qty } ]
  const { userName, products } = data;
  return async (dispatch) => {
    if (userName) {
      const res = await fetch("http://localhost:3001/order/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const resJson = await res.json();
      dispatch({
        type: "CREATE_ORDER",
        payload: resJson,
      });
    } else {
      dispatch({
        type: "CREATE_ORDER",
        payload: { message: "Aún no estas logueado" },
      });
    }
  };
};

export const updateOrder = (data) => {
  //const { userName, products } = req.body;
  //orderState
  //products es un arreglo de objetos
  // [ { name, qty }, { name, qty } ]
  const { userName, uuid, products } = data;
  return async (dispatch) => {
    if (userName) {
      const res = await fetch("http://localhost:3001/order/update/" + uuid, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(products),
      });
      const resJson = await res.json();
      dispatch({
        type: "UPDATE_ORDER",
        payload: resJson,
      });
    } else {
      dispatch({
        type: "UPDATE_ORDER",
        payload: { message: "Aún no estas logueado" },
      });
    }
  };
};
