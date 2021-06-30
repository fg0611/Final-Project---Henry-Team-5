import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getCategories,
  getCategoryByName,
  addCategory,
  deleteSuccess,
} from "../redux/actions/categoryActions";

import {
  Grid,
  Container,
  Typography,
  Button,
  Box,
  TextField,
} from "@material-ui/core";

import { sweetAlert } from "../helpers/utils";
import makeStyles from "./componentsStyles/AddCategorySytles";

const initialState = {
  name: "",
  image: "",
};

export default function AddCategory() {
  const classes = makeStyles();
  const [formState, setFormState] = useState(initialState);
  const [currentSelectedState, setCurrentSelectedState] = useState({
    name: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const categories = useSelector((store) => store.categories.categories);
  const success = useSelector((store) => store.categories.success);

  useEffect(() => {}, [categories]); //redenrizar de vuelta

  useEffect(() => {
    if (success?.category) {
      // Select new current category on select box
      setCurrentSelectedState({ value: success.category.uuid });
      const categoryImageTag = document.getElementById("categoryImage");
      categoryImageTag.setAttribute("src", success.category.image);
      dispatch(deleteSuccess());
      resetState();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  const handleOnChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const handleOnClickAddCategory = () => {
    if (!formState.name || formState.name.length < 3) {
      sweetAlert(
        "Atención",
        "El nombre de la categoria es requerido y debe tener al menos 3 caracteres",
        "warning",
        "OK",
        5000
      );
      return;
    }

    if (!formState.image || formState.image.length < 3) {
      sweetAlert(
        "Atención",
        "La imagen es requerida y debe tener al menos 3 caracteres",
        "warning",
        "OK",
        5000
      );
      return;
    }
    dispatch(addCategory(formState));
  };

  const resetState = () => {
    setFormState({
      name: "",
      image: "",
    });
  };

  const handleOnKeyPress = (event) => {
    if (!categories || categories.length === 0) return;
    const name = event.target.value;
    dispatch(getCategoryByName(name));
  };

  const handleOnChangeCategory = (event) => {
    const urlImage = event.target.options[
      event.target.selectedIndex
    ].getAttribute("data-img");
    const categoryImage = document.getElementById("categoryImage");
    categoryImage.setAttribute("src", urlImage);
    // Select current category on select box
    const value = event.target.options[event.target.selectedIndex].getAttribute(
      "value"
    );
    setCurrentSelectedState({ value: value });
  };

  const sortByCategoryNameAZ = (categoryA, categoryB) => {
    if (categoryA.name < categoryB.name) {
      return -1;
    } else if (categoryA.name > categoryB.name) {
      return 1;
    } else {
      return 0;
    }
  };

  return (
    <>
      <Container container className={classes.container} maxWidth="md">
        <Typography align="center" variant="h4">
          Crear Categoría
        </Typography>
        <Box
          id="new-category-section"
          border={1}
          borderRadius={16}
          borderColor="grey.500"
        >
          <Box p={3}>
            <Grid container id="inputsContainer" spacing={4}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Categoria"
                  placeholder="Escribir una categoria..."
                  name="name"
                  id="categoryName"
                  value={formState.name}
                  onChange={handleOnChange}
                  onKeyPress={handleOnKeyPress}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Url de la imagen"
                  name="image"
                  type="text"
                  id="categoryUrlImage"
                  placeholder="Escribir el url de la imagen..."
                  value={formState.image}
                  onChange={handleOnChange}
                />
              </Grid>
            </Grid>
          </Box>

          <Box p={3}>
            <Grid container spacing={4} id="selectImageContainer">
              <Grid item xs={12} sm={6}>
                <select
                  className={classes.select}
                  size="15"
                  onChange={handleOnChangeCategory}
                  value={currentSelectedState.value}
                >
                  {categories?.sort(sortByCategoryNameAZ).map((category) => (
                    <option
                      key={category.uuid}
                      value={category.uuid}
                      data-img={category.image}
                    >
                      {category.name}
                    </option>
                  ))}
                </select>
              </Grid>

              <Grid item c xs={12} sm={6}>
                <img
                  className={classes.image}
                  id="categoryImage"
                  alt="Foto categoría no disponible..."
                ></img>
              </Grid>
            </Grid>
          </Box>

          <Box p={3}>
            <Grid container spacing={4}>
              <Grid item xm={12} sm={6}>
                <Button variant="contained" color="secondary" fullWidth>
                  Eliminar Categoría
                </Button>
              </Grid>

              <Grid item xm={12} sm={6}>
                <Button
                  variant="contained"
                  fullWidth
                  color="primary"
                  onClick={handleOnClickAddCategory}
                >
                  Crear Categoría
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}
