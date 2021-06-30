import { useDispatch } from "react-redux";
import { useState } from "react";
import React from "react";
import {
  Button,
  Grid,
  TextField,
  makeStyles,
  Typography,
  Box,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  shippingForm: {
    display: "flex",
    justifyContent: "center",
  },
}));

export default function ShippingForm() {
  const dispatch = useDispatch();

  const [datos, setDatos] = useState({
    name: "",
    lastName: "",
    shippingAdress: "",
    shippingZip: "",
    shippingState: "",
    shippingCity: "",
    comments: "",
  });

  const handleInputChange = (event) => {
    setDatos({
      ...datos,
      [event.target.name]: event.target.value,
    });
  };

  const enviarDatos = (event) => {
    event.preventDefault();
    dispatch(ShippingForm(datos));
    setDatos({
      name: "",
      lastName: "",
      shippingAdress: "",
      shippingZip: "",
      shippingState: "",
      shippingCity: "",
      comments: "",
    });
  };

  const classes = useStyles();

  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <Box m={1} className={classes.shippingForm}>
            <Typography variant="h5" color="initial">
              Datos de Envio
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box m={1} className={classes.shippingForm}>
            <TextField
              placeholder="Ingrese su Nombre"
              variant="outlined"
              value={datos.name}
              onChange={handleInputChange}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box m={1} className={classes.shippingForm}>
            <TextField
              placeholder="Ingrese su Apellido"
              value={datos.lastName}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box m={1} className={classes.shippingForm}>
            <TextField
              placeholder="Dirección"
              value={datos.shippingAdress}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box m={1} className={classes.shippingForm}>
            <TextField
              placeholder="Codigo Postal"
              value={datos.shippingZip}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box m={1} className={classes.shippingForm}>
            <TextField
              placeholder="Provincia"
              value={datos.shippingState}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box m={1} className={classes.shippingForm}>
            <TextField
              placeholder="Ciudad"
              value={datos.shippingCity}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box m={1} className={classes.shippingForm}>
            <TextField
              placeholder="Aclaración"
              value={datos.comments}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box m={1} className={classes.shippingForm}>
            <Button
              size="large"
              variant="outlined"
              color="primary"
              href="#outlined-buttons"
              justify="center"
              AlignItems="center"
              submit={enviarDatos}
            >
              Enviar
            </Button>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
