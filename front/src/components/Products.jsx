import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "./ProductCard";
import ProductsByCategory from "./ProductsByCategory";
import { getProducts } from "../redux/actions/productActions";
import { Box, Grid, Typography } from "@material-ui/core";

export default function Products() {
  const dispatch = useDispatch();
  const products = useSelector((store) => store.products.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  //const product= products.map(e => e.name
  //aca tengo que iterar, y mandale a product card por props la data y desde product card
  // al hacer click al nombre, mandar el /detail para ver en detalle mas la informacion
  // del producto
  let renderProducts = [];
  !products ? (
    <Typography variant="h4" justifyContent="center">
      No se encontraron Productos en esta Categoria
    </Typography>
  ) : (
    (renderProducts = products.map((e) => {
      return (
        <Grid item xs={12} md={6} lg={4}>
          <Box m={2}>
            <ProductCard
              key={e.uuid}
              uuid={e.uuid}
              name={e.name}
              description={e.description}
              image={e.image}
              price={e.price}
              stock={e.stock}
            />
          </Box>
        </Grid>
      );
    }))
  );
  return (
    <div>
      <Box m={2}>
        <ProductsByCategory />
      </Box>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        {renderProducts}
      </Grid>
    </div>
  );
}
