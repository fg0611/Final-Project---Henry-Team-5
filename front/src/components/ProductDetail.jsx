import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import Reviews from "./Reviews.jsx";
import { findProduct } from "../redux/actions/productActions.js";
import { addToCart } from '../redux/actions/cartActions.js'
import {
  makeStyles,
  Box,
  Grid,
  CardMedia,
  Typography,
  Button,
} from "@material-ui/core/";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faEdit, faPlusCircle, faMinusCircle } from "@fortawesome/free-solid-svg-icons";

import defaultImg from "../imgs/default.svg";

const useStyles = makeStyles((theme) => ({
  description: {
    flexDirection: "column",
  },
}));


const ProductDetail = ({ location }) => {
  const classes = useStyles();
  let history = useHistory();
  const detail = useSelector((store) => store.products.product);
  const dispatch = useDispatch();

  const { pathname } = location;

  const uuid = pathname.split("/")[3];

  useEffect(() => {
    dispatch(findProduct(uuid));
  }, [dispatch, uuid]);

  function clickToAdd(){
    dispatch(addToCart(uuid, 1))
    history.push('/cart')
  }

  return (
    <div>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Box m={5}>
            <CardMedia
              component="img"
              alt={detail.name}
              height="500"
              image={detail.image || defaultImg}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box m={5} display="flex" className={classes.description}>
            <Box m={2}>
              <Typography variant="body2" color="primary" component="p">
                Categorias: {detail.categories}
              </Typography>
            </Box>
            <Box m={2}>
              <Typography variant="h4" color="initial">
                {detail.name}
              </Typography>
            </Box>
            <Box m={2}>
              <Typography variant="h4" color="primary" component="p">
                Precio: ${detail.price}
              </Typography>
            </Box>
            <Box m={2}>
              <Typography variant="h6" color="primary" component="p">
                Stock: {detail.stock}
              </Typography>
            </Box>
            <Box m={2}>
              <Typography variant="body1" color="primary" component="p">
                Descripción: {detail.description}
              </Typography>
            </Box>
            {/* <Box m={2}>
              <Typography variant="body2" color="initial">
                Cantidad
              </Typography>
              <Button
                color="secondary"
                variant="contained"
                onClick={clickToMin}
              >
                <FontAwesomeIcon size="2x" icon={faMinusCircle} />
              </Button>
              <Typography variant="span"> 0 {refres}</Typography>
              <Button
                color="primary"
                variant="contained" onClick={clickToAdd}
              >
                <FontAwesomeIcon size="2x" icon={faPlusCircle} />
              </Button>
            </Box> */}
            <Button onClick={clickToAdd}><FontAwesomeIcon icon={faCartPlus}/>Agregar al Carrito </Button>
          </Box>
          <Box>
            <Button href={`/product/edit/${uuid}`}>
              <FontAwesomeIcon size = "3x" icon={faEdit} />
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box display="flex" justifyContent="center">
            <Reviews />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductDetail;


