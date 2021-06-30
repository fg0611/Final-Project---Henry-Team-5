import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";

const SearchProducts = () => {
  const searchProducts = useSelector((store) => store.products.products);

  return searchProducts.map((e) => {
    return (
      <ProductCard
        key={e.uuid}
        uuid={e.uuid}
        name={e.name}
        description={e.description}
        image={e.image}
        price={e.price}
        stock={e.stock}
      />
    );
  });
};

export default SearchProducts;
