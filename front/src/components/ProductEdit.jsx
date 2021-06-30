import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editProduct } from "../redux/actions/productActions.js";
import { getCategories } from "../redux/actions/categoryActions";
import makeStyles from "./componentsStyles/AddProductsStyles";
import {
  FormControl,
  Select,
  TextField,
  Grid,
  Button,
  Typography,
} from "@material-ui/core";

export default function ProductEdit(props) {
  const classes = makeStyles();
  const dispatch = useDispatch();
  const store = useSelector((store) => store);

  const categories = store.categories.categories;
  const modificado = store.products.message;

  const uuid = props.match.params.uuid;

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const [datos, setDatos] = useState({
    uuid,
    name: "",
    description: "",
    price: "",
    stock: "",
    categories: [],
  });

  const handleInputChange = (event) => {
    setDatos({
      ...datos,
      [event.target.name]: event.target.value,
    });
  };

  const handleCat = (event) => {
    event.preventDefault();
    const options = event.target.options;
    const seleccionadas = [];
    for (let option of options) {
      if (option.selected) {
        seleccionadas.push(option.value);
      }
    }
    setDatos({
      ...datos,
      categories: seleccionadas,
    });
  };

  const enviarDatos = (event) => {
    event.preventDefault();
    let objDatos = { uuid };
    if (datos.name) {
      objDatos.name = datos.name;
    }
    if (datos.description) {
      objDatos.description = datos.description;
    }
    if (datos.price) {
      objDatos.price = parseInt(datos.price);
    }
    if (datos.stock) {
      objDatos.stock = parseInt(datos.stock);
    }
    if (datos.categories) {
      objDatos.categories = datos.categories;
    }

    dispatch(editProduct(objDatos));
  };

  return (
    <Grid>
      <FormControl className={classes.root} noValidate>
        <Grid
          container
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: "100vh" }}
        >
          <Typography variant="h5" color="initial">
            Modificar Producto
          </Typography>
          <TextField
            id="product"
            label="Producto"
            value={datos.name}
            onChange={handleInputChange}
            variant="filled"
            className={classes.color}
            name="name"
            type="text"
          />
          <TextField
            id="description"
            label="Descripcion"
            value={datos.description}
            onChange={handleInputChange}
            variant="filled"
            type="text"
            name="description"
          />
          <TextField
            id="price"
            label="Precio"
            value={datos.price}
            onChange={handleInputChange}
            variant="filled"
            type="number"
            name="price"
          />
          <TextField
            id="stock"
            label="Stock"
            value={datos.stock}
            onChange={handleInputChange}
            variant="filled"
            type="number"
            name="stock"
          />
          <Select
            variant="filled"
            className={classes.input}
            multiple
            native
            name="categories"
            value={datos.categories}
            onChange={handleCat}
            inputProps={{
              id: "select-multiple-native",
            }}
          >
            {categories?.map((each) => {
              return (
                <option value={each.name} key={each.uuid}>
                  {each.name}
                </option>
              );
            })}
          </Select>
          <Button
            size="large"
            variant="outlined"
            color="primary"
            justify="center"
            AlignItems="center"
            onClick={enviarDatos}
          >
            Editar
          </Button>
        </Grid>
      </FormControl>
    </Grid>
  );
}
