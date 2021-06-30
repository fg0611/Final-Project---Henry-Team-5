import React from "react";
import { useDispatch } from "react-redux";
import { Container, Typography, Button } from "@material-ui/core";
import {goToCheckout} from "../redux/actions/cartActions";

export const CartTotal = ({cartItems}) => {
  const dispatch = useDispatch();
  const total = cartItems.reduce((acc, product) => acc + product.price * product.quantity, 0);

  const handleGoToCheckout = () => dispatch(goToCheckout());

  return (
    <Container>
      <Typography> Total: ${`${total}`}</Typography>
      <Button onClick={handleGoToCheckout} >Comprar</Button>
    </Container>
  );
};

export default CartTotal;
