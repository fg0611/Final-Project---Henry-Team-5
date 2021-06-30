import { useDispatch } from "react-redux";
import { useState } from "react";
import { resetUserPassword } from "../redux/actions/userActions.js";

import {
  Button,
  Grid,
  TextField,
  makeStyles,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function PasswordReset({ uuid }) {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [datos, setDatos] = useState({
    uuid,
    newPassword: "",
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
    dispatch(resetUserPassword(datos));
    setDatos({
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <Grid>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={enviarDatos}
      >
        <Grid
          container
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: "100vh" }}
        >
          <Typography variant="h5" color="initial">
            Cambiar Contraseña
          </Typography>
          <TextField
            value={datos.newPassword}
            type="password"
            placeholder="Nueva Contraseña"
            name="newPassword"
            onChange={handleInputChange}
          />
          <TextField
            value={datos.confirmPassword}
            type="password"
            placeholder="Confirmar Contraseña"
            name="confirmPassword"
            onChange={handleInputChange}
          />

          <Button
            size="large"
            variant="outlined"
            color="primary"
            justify="center"
            AlignItems="center"
            type="submit"
          >
            Confirmar
          </Button>
        </Grid>
      </form>
    </Grid>
  );
}
