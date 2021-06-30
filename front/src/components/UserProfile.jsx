import React from "react";
import {
  Box,
  Button,
  CardMedia,
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core";
import jwt from 'jsonwebtoken';

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

const UserProfile = () => {
  const token = sessionStorage.getItem('user');
  const tokeen = JSON.parse(token)
  const user = jwt.decode(tokeen)

  const userAdmin = user.isAdmin;
  const classes = useStyles();


  return (
    <div>
      <Grid container>
        <Grid Item xs={12} md={12} justifyContent="center" alignItems="center">
            <CardMedia
              component="img"
              className={classes.media}
              src="https://www.labicok.com/wp-content/uploads/2020/09/default-user-image.png"
            />
            <Typography variant="h4">Bienvenidx {user.firstName}!</Typography>
        </Grid>
        <Grid Item xs={6} md={4}>
          <Box m={6} display="flex" justifyContent="center">
            <Button variant="contained" color="primary">
              Mis Compras
            </Button>
          </Box>
        </Grid>
        <Grid Item xs={6} md={4}>
          <Box m={6} display="flex" justifyContent="center">
            <Button color="primary" variant="contained">
              Editar Perfil
            </Button>
          </Box>
        </Grid>
        <Grid Item xs={6} md={4}>
          <Box m={6} display="flex" justifyContent="center">
            <Button color="primary" variant="contained">
              Eliminar Perfil
            </Button>
          </Box>
        </Grid>
        {userAdmin?
        <>
        <Grid Item xs={6} md={4}>
          <Box m={6} display="flex" justifyContent="center">
            <Button href="/product/add" variant="contained" color="primary">
              Agregar Productos
            </Button>
          </Box>
        </Grid>
        <Grid Item xs={6} md={4}>
          <Box m={6} display="flex" justifyContent="center">
            <Button href="/category/add" color="primary" variant="contained">
              Agregar Categorias
            </Button>
          </Box>
        </Grid>
        <Grid Item xs={6} md={4}>
          <Box m={6} display="flex" justifyContent="center">
            <Button href="/user/promote" color="primary" variant="contained">
              Asignar Rol
            </Button>
          </Box>
        </Grid>
        </>
        :<> </>
      }
      </Grid>
    </div>
  );
};

export default UserProfile;