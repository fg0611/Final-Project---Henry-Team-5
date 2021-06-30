import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";

import { Button, Card, CardContent, Grid, Typography, Snackbar } from "@material-ui/core";

import MuiAlert from "@material-ui/lab/Alert";

import { selectAdmins } from "../redux/actions/userActions.js";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "0 0 50px rgb(234, 232, 300)",
    marginTop: "20px",
    display: "flex",
    justifyContent: "space-between",
  },
  data: {
    display: "flex",
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  rootSnack: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function UserCard({ uuid, email, isAdmin }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const addAdmin = (uuid, act) => {
    dispatch(selectAdmins(uuid, act));
  };

  function allOnClicksTrue() {
    addAdmin(uuid, true);
    handleClick();
  }

  function allOnClicksFalse() {
    addAdmin(uuid, false);
    handleClick();
  }

  return (
    <Card className={classes.root}>
      <Grid item xs={3}>
        <CardContent className={classes.data}>
          <Typography>{email}</Typography>
        </CardContent>
      </Grid>
      <Grid item xs={3}>
        <CardContent>
          <Typography>{!isAdmin ? "" : "ADMINISTRADOR"}</Typography>
        </CardContent>
      </Grid>
      <Grid item xs={3} className={classes.buttons}>
        {!isAdmin ? (
          <>
            <Button onClick={allOnClicksTrue} color="primary" variant="contained">
              Designar Admin
            </Button>
            <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success">
                {email} ahora es administrador
              </Alert>
            </Snackbar>
          </>
        ) : (
          <>
            <Button onClick={allOnClicksFalse} color="secondary" variant="contained">
              Descartar Admin
            </Button>
            <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="error">
                {email} no es mas administrador
              </Alert>
            </Snackbar>
          </>
        )}
      </Grid>
    </Card>
  );
}
