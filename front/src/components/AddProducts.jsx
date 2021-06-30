import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { createProduct } from "../redux/actions/productActions.js";
import { getCategories } from '../redux/actions/categoryActions';
import makeStyles from './componentsStyles/AddProductsStyles'
import { Container, Card} from "@material-ui/core";


export default function AddProduct() {
  const classes = makeStyles()
  const dispatch = useDispatch();
  const store = useSelector((store) => store);

  const categories = store.categories.categories;
  const loading = store.products.loading;
  const agregado = store.products.message;

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  
  const [datos, setDatos] = useState({
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
        categories: seleccionadas
    })
  };

  const enviarDatos = (event) => {
    event.preventDefault();
    dispatch(createProduct(datos));
  };

  if (loading) {
    return (
      <div>
        <h1> LOADING... </h1>
      </div>
    );
  } else {
    return (
    <Container >
        <Card className={classes.container}> 
        <h5 className={classes.title}>AGREGAR PRODUCTO</h5> <hr/>
        <form onSubmit={enviarDatos}>
          <div>
            <section>
              <input className={classes.input}
                type="text"
                placeholder="Nombre"
                name="name"
                onChange={handleInputChange}
              />
            </section>
            <section>
              <input className={classes.input}
                type="text"
                placeholder="Descripción"
                name="descripcion"
                onChange={handleInputChange}
              />
            </section>
            <section>
              
              <input className={classes.input}
                type="number"
                placeholder="$Precio"
                name="price"
                onChange={handleInputChange}
              />
            </section>
            <section>
              <input className={classes.input}
                type="number"
                placeholder="Stock"
                name="stock"
                onChange={handleInputChange}
              />
            </section>
          </div>
          <div className={classes.input}>
            <label for="mainPic">Imagenes del producto:</label>
            <input
              type="file"
              id="mainPic"
              name="mainPic"
              accept="image/jpeg"
            />
          </div>
          <select className={classes.input} multiple name="categories" onChange={handleCat} required>
            {categories?.map((each) => {
              return (
                <option value={each.name} key={each.uuid}>
                  {each.name}
                </option>
              );
            })}
          </select> <br/>
          
          <input className={classes.input} type="submit" value="Agregar" /> <hr/>
            <div>{agregado.message}</div>
        </form>
        </Card>
      </Container >
     
    );
  }
}
