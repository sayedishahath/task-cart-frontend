import React from 'react';
import styles from "./ProductCard.module.css";
import { useNavigate } from 'react-router';
import { useAuth } from '../../../context/AuthContext';
import { startCreateCart } from '../../../actions/cartAction'
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
export default function ProductCard({ product }) {
  const truncatedTitle = product.title.substring(0, 18) + (product.title.length > 18 ? '...' : '');

  const {user}= useAuth()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleAddtoCart =(prod)=>{
    if(user){
      const cart = {
        lineItems : [
            {
                productId: prod.id,
                productName: prod.title,
                productImage: prod.image,
                quantity: 1,
                price : prod.price
            }
        ]
    }
    dispatch(startCreateCart(cart));
    }else{
      navigate('/login')
    }
  }
  return (
    <div className={styles.productCard}>
      <img src={product.image} alt={product.title} className={styles.productImage} />
      <div className={styles.productInfo}>
        <h2 className={styles.productName}>{truncatedTitle}</h2>
        <p className={styles.productPrice}>${product.price}</p>
        <button className={styles.addToCartButton}
        onClick={()=>{
          handleAddtoCart(product)
        }}
        >Add to Cart</button>
      </div>
    </div>
  );
}