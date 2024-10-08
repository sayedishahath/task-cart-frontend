import React from 'react';
import { useMediaQuery } from 'react-responsive';
import styles from './cartCard.module.css';
import { useDispatch } from 'react-redux';

export default function CartCard({ item, onRemove, onQtyInc, onQtyDec }) {
  const dispatch = useDispatch()
  const { productName, productImage, price, quantity } = item;
  const truncatedTitle = productName.substring(0, 18) + (productName.length > 18 ? '...' : '');

  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const handleQtyIncrease = () => {
    onQtyInc(item)
  };

  const handleQtyDecrease = () => {
    onQtyDec(item)
  };

  const handleRemove = () => {
    onRemove(item);
  };

  return (
    <div className={styles.cartCard}>
      <img src={productImage} alt={productName} className={styles.image} />
      <div className={styles.info}>
        <h4 className={styles.name}>
          {isMobile ? truncatedTitle : productName}
        </h4>
        <p className={styles.price}>${price}</p>
        <div className={styles.qtyContainer}>
          <button className={styles.qtyButton} onClick={handleQtyDecrease}
          disabled={quantity === 1}>
            -
          </button>
          <span className={styles.qty}>{quantity}</span>
          <button className={styles.qtyButton} onClick={handleQtyIncrease}>
            +
          </button>
        </div>
        <button className={styles.removeButton} onClick={handleRemove}>
          Remove
        </button>
      </div>
    </div>
  );
}