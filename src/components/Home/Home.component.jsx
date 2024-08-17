import ProductCard from "../general/ProductCard/productCard.component";
import styles from "./Home.module.css"
import { useSelector } from "react-redux";

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