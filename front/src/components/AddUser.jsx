import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addUser } from "../redux/actions/userActions.js";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  TextField,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  textField: {
    "& > *": {
      margin: theme.spacing(1),
      display: "flex",
      flexDirection: "column",
    },
  },
  paper: {
    backgroundColor: "RGBA(255,255,255,0.8)",
    borderRadius: "10px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    margin: "1rem",
  },
}));

export default function AddUser() {
  const dispatch = useDispatch();

  const [datos, setDatos] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (event) => {
    setDatos({
      ...datos,
      [event.target.name]: event.target.value,
    });
  };

  const enviarDatos = (event) => {
    event.preventDefault();
    dispatch(addUser(datos));
    setDatos({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const classes = useStyles();

  return (
    <div className={classes.paper}>
      <Card className={classes.textField}>
        <CardContent>
          <Typography variant="h5" color="initial">
            Registrarse
          </Typography>
          <TextField
            id="outlined-name"
            label="Nombre"
            value={datos.firstName}
            onChange={handleInputChange}
            variant="outlined"
            name="firstName"
          />
          <TextField
            id="outlined-name"
            label="Apellido"
            value={datos.lastName}
            onChange={handleInputChange}
            variant="outlined"
            name="lastName"
          />
          <TextField
            id="outlined-name"
            label="Correo Electronico"
            value={datos.email}
            onChange={handleInputChange}
            variant="outlined"
            name="email"
          />
          <TextField
            id="outlined-name"
            label="Contraseña"
            value={datos.password}
            onChange={handleInputChange}
            variant="outlined"
            name="password"
          />
          <TextField
            id="outlined-name"
            label="Confirmar Contraseña"
            value={datos.confirmPassword}
            onChange={handleInputChange}
            variant="outlined"
            name="confirmPassword"
          />
        </CardContent>
        <CardActions>
          <Button size="small" onClick={enviarDatos}>
            Registrarse
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
