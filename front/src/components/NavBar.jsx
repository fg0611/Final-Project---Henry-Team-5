import { useState } from "react";
import { useHistory } from "react-router-dom";
import SearchBar from "./SearchBar.jsx";
import AddUser from "./AddUser.jsx";
import { logIn, userLogout } from "../redux/actions/userActions.js";

import {
  AppBar,
  Backdrop,
  Badge, //LLeva un contador con la cantidad de elementos que hay en el carrito
  Button,
  Fade,
  fade,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  MenuItem,
  Menu,
  Modal,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  TextField,
  makeStyles,
} from "@material-ui/core";

import {
  faBars,
  faUser,
  faCartPlus,
  faEllipsisV,
  faSeedling,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../imgs/Healthy.png";
import { useDispatch, useSelector } from "react-redux";

//import jwt from "jsonwebtoken";
// const token = window.sessionStorage.getItem('user');
// console.log(token)
// const user = jwt.decode(JSON.parse(token));
// console.log(user)

const useStyles = makeStyles((theme) => ({
  offset: theme.mixins.toolbar,
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(3),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
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
  listItemText: {
    color: "orange",
  },
  media: {
    width: "2.5vw",
    borderRadius: "15px",
  },
}));

const NavBar = () => {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.cart.cartItems);

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [anchorEle, setAnchorEle] = useState(null);
  const [open, setOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const openProfile = Boolean(anchorEle);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLoggedOpen = () => {
    setUserOpen(true);
  };
  const handleRegisterOpen = () => {
    setRegisterOpen(true);
  };

  const handleLoginClose = () => {
    setUserOpen(false);
  };
  const handleRegisterClose = () => {
    setRegisterOpen(false);
  };

  const handleClick = (event) => {
    setAnchorEle(event.currentTarget);
  };

  const handleLoginMenuClose = () => {
    setAnchorEle(null);
  };
  const handleRegisterMenuClose = () => {
    setAnchorEle(null);
  };

  function onClickLogin() {
    handleLoginMenuClose();
    handleLoggedOpen();
  }
  function onClickRegister() {
    handleRegisterMenuClose();
    handleRegisterOpen();
  }

  const goToCart = () => {
    history.push("/cart");
    window.scroll(0, 0);
  };

  const logout = () => {
    dispatch(userLogout());
  };

  const showItems = (state) => {
    // let count = 0;
    // for (let item of state) {
    //   count = count + item.quantity;
    // }
    // return count;
  };

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton color="inherit">
          <FontAwesomeIcon icon={faCartPlus} />
        </IconButton>
      </MenuItem>
      <MenuItem>
        <IconButton color="inherit">
          <FontAwesomeIcon icon={faUser} />
        </IconButton>
      </MenuItem>
    </Menu>
  );

  const mainMenu = (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div>
          <List component="nav">
            <Button href="/products">
              <ListItem button className={classes.paper}>
                <ListItemIcon>
                  <FontAwesomeIcon color="green" icon={faSeedling} />
                </ListItemIcon>
                <ListItemText
                  primary="Productos"
                  className={classes.listItemText}
                />
              </ListItem>
            </Button>
            <Button>
              <ListItem button className={classes.paper}>
                <ListItemIcon>
                  <FontAwesomeIcon color="green" icon={faSeedling} />
                </ListItemIcon>
                <ListItemText
                  primary="Categorias"
                  className={classes.listItemText}
                />
              </ListItem>
            </Button>
            <Button>
              <ListItem button className={classes.paper}>
                <ListItemIcon>
                  <FontAwesomeIcon color="green" icon={faSeedling} />
                </ListItemIcon>
                <ListItemText
                  primary="Contacto"
                  className={classes.listItemText}
                />
              </ListItem>
            </Button>
            <Button>
              <ListItem button className={classes.paper}>
                <ListItemIcon>
                  <FontAwesomeIcon color="green" icon={faSeedling} />
                </ListItemIcon>
                <ListItemText
                  primary="Nosotros"
                  className={classes.listItemText}
                />
              </ListItem>
            </Button>
          </List>
        </div>
      </Fade>
    </Modal>
  );
  const [datos, setDatos] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    setDatos({
      ...datos,
      [event.target.name]: event.target.value,
    });
  };

  const enviarDatos = (event) => {
    event.preventDefault();
    dispatch(logIn(datos));
    setDatos({
      email: "",
      password: "",
    });
  };

  const login = (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={userOpen}
      onClose={handleLoginClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={userOpen}>
        <div className={classes.paper}>
          <Card className={classes.textField}>
            <CardContent>
              <form className={classes.textField}>
                <TextField
                  name="email"
                  value={datos.email}
                  label="Email"
                  variant="outlined"
                  onChange={handleInputChange}
                />
                <TextField
                  name="password"
                  value={datos.password}
                  type="text"
                  label="Contraseña"
                  variant="outlined"
                  onChange={handleInputChange}
                />
              </form>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={enviarDatos}>
                Iniciar Sesión
              </Button>
              <Button
                class="g-signin2"
                data-onsuccess="onSignIn"
                href="http://localhost:3001/auth/login/google"
              >
                Iniciar sesion con Google
              </Button>
              <Button size="small">Olvidé Mi Contraseña</Button>
            </CardActions>
          </Card>
        </div>
      </Fade>
    </Modal>
  );

  const profileMenu = (
    <Menu
      id="fade-menu"
      anchorEl={anchorEle}
      keepMounted
      open={openProfile}
      onClose={handleLoginMenuClose}
      TransitionComponent={Fade}
    >
      {window.sessionStorage.getItem("user") ? (
        <>
          <MenuItem onClick={handleLoginMenuClose}>
            <Button href="/user/profile">Perfil</Button>
          </MenuItem>
          <MenuItem onClick={logout}>
            <Button> Cerrar Sesión</Button>
          </MenuItem>
        </>
      ) : (
        <>
          <MenuItem onClick={() => onClickLogin()}>Iniciar Sesión</MenuItem>
          <MenuItem onClick={() => onClickRegister()}>Registrarse</MenuItem>
        </>
      )}
    </Menu>
  );

  const register = (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={registerOpen}
      onClose={handleRegisterClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={registerOpen}>
        <AddUser />
      </Fade>
    </Modal>
  );

  return (
    <div className={classes.grow}>
      <AppBar>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={handleOpen}
          >
            <FontAwesomeIcon icon={faBars} />
          </IconButton>
          <IconButton color="inherit">
            <Button href="/" className={classes.grow}>
              <Card>
                <CardMedia
                  component="img"
                  image={logo}
                  className={classes.media}
                />
              </Card>
            </Button>
          </IconButton>
          <div className={classes.grow} />
          <div className={classes.search}>
            <SearchBar />
          </div>
          <div className={classes.sectionDesktop}>
            <IconButton color="inherit" aria-label="agregar" onClick={goToCart}>
              <Badge badgeContent={showItems(state)} color="secondary">
                <FontAwesomeIcon icon={faCartPlus} />
              </Badge>
            </IconButton>
            <IconButton color="inherit" onClick={handleClick}>
              <FontAwesomeIcon icon={faUser} />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <FontAwesomeIcon icon={faEllipsisV} />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {register}
      {profileMenu}
      {mainMenu}
      {renderMobileMenu}
      {login}
      <div className={classes.offset}></div>
    </div>
  );
};

export default NavBar;
