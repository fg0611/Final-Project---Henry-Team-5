import React from "react";
import { Route } from "react-router-dom";
import AddCategory from "./components/AddCategory";
import NavBar from "./components/NavBar";
import ProductDetail from "./components/ProductDetail";
import Products from "./components/Products";
import AddProducts from "./components/AddProducts.jsx";
import SearchProduct from "./components/SearchProduct.jsx";
import AddUser from "./components/AddUser.jsx";
import Cart from "./components/Cart.jsx";
import Home from "./components/Home.jsx";
import ShippingForm from "./components/ShippingForm.jsx";
import Promote from './components/Promote.jsx';
import PasswordReset from "./components/PasswordReset.jsx";
import ProductEdit from "./components/ProductEdit.jsx";
import UserProfile from "./components/UserProfile.jsx";
import NotAcces from "./components/NotAcces.jsx";
//import jwt from 'jsonwebtoken';

const App = () => {
// const token = sessionStorage.getItem('user');
// const tokeen = JSON.parse(token)
// const user = jwt.decode(tokeen)

  return (
    <React.Fragment>
      <Route path="/" component={NavBar} />
      <Route exact path="/" component={Home} />
      <Route exact path="/products" component={Products} />
      <Route path="/product/detail" component={ProductDetail} />
      <Route exact path="/category/add" component={AddCategory} />
      <Route exact path="/product/add" component={AddProducts} />
      <Route path="/products/search" component={SearchProduct} />
      <Route exact path="/cart" component={Cart} />
      <Route exact path="/user/add" component={AddUser} />
      <Route exact path="/user/profile" component={UserProfile} />
      <Route exact path="/user/resetPassword" component={PasswordReset} />
      <Route exact path="/product/edit/:uuid" component = {ProductEdit} />
      <Route exact path="/user/promote" component={Promote} />
      <Route exact path="/restricted" component = {NotAcces} />
    </React.Fragment>
  );
};

export default App;
