import ProductCard from "../general/ProductCard/productCard.component";
import styles from "./Home.module.css"
import { useSelector } from "react-redux";
const products = [
    {
      id: 1,
      image: 'https://example.com/product1.jpg',
      name: 'Product 1',
      price: 19.99
    },
    {
      id: 2,
      image: 'https://example.com/product2.jpg',
      name: 'Product 2',
      price: 29.99
    },
    {
      id: 2,
      image: 'https://example.com/product2.jpg',
      name: 'Product 2',
      price: 29.99
    },
    {
      id: 2,
      image: 'https://example.com/product2.jpg',
      name: 'Product 2',
      price: 29.99
    },
    {
      id: 2,
      image: 'https://example.com/product2.jpg',
      name: 'Product 2',
      price: 29.99
    },
    {
      id: 2,
      image: 'https://example.com/product2.jpg',
      name: 'Product 2',
      price: 29.99
    },
    {
      id: 2,
      image: 'https://example.com/product2.jpg',
      name: 'Product 2',
      price: 29.99
    },
    // ...
  ];
export default function Home() {
  const products = useSelector((state)=>{
    return state.products.data
  })
  console.log('products',products)
    return (
        <div className={styles['product-grid']}>
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    )
}