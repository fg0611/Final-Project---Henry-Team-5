import React from "react";
import {
  Grid,
  Box,
  makeStyles,
  Button,
  CardMedia,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  description: {
    flexDirection: "column",
  },
  media: {
    display: "flex",
    border: "0.3rem ",
    maxWidth: "20vw",
    borderRadius: "50%",
    height: "20vw",
    margin: "auto",
  },
}));

const LoggedUser = () => {
  const classes = useStyles();
  return (
    <div>
      <Grid container>
        <Grid Item xs={12} md={12}>
          <Box m={5} justifyContent="center" alignItems="center">
            <CardMedia
              component="img"
              className={classes.media}
              src="https://pbs.twimg.com/profile_images/378800000577800368/8971cbd36c355fdfa166d1e32c443cb7.jpeg"
            />
          </Box>
        </Grid>
        <Grid Item xs={12} md={4}>
          <Box m={6} display="flex" justifyContent="center">
            <Button variant="contained" color="primary">
              Tus Compras
            </Button>
          </Box>
        </Grid>
        <Grid Item xs={12} md={4}>
          <Box m={6} display="flex" justifyContent="center">
            <Button color="primary" variant="contained">
              Editar Perfil
            </Button>
          </Box>
        </Grid>
        <Grid Item xs={12} md={4}>
          <Box m={6} display="flex" justifyContent="center">
            <Button color="primary" variant="contained">
              Eliminar Perfil
            </Button>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default LoggedUser;