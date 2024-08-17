import React from 'react';
import styles from './cartCard.module.css';

export default function CartCard({ item, onRemove, onQtyChange }) {
  const { productName, productImage, price, quantity } = item;

  const handleQtyIncrease = () => {
    onQtyChange(item, qty + 1);
  };

  const handleQtyDecrease = () => {
    if (qty > 1) {
      onQtyChange(item, qty - 1);
    }
  };

  const handleRemove = () => {
    onRemove(item);
  };

  return (
    <div className={styles.cartCard}>
      <img src={productImage} alt={productName} className={styles.image} />
      <div className={styles.info}>
        <h4 className={styles.name}>{productName}</h4>
        <p className={styles.price}>${price}</p>
        <div className={styles.qtyContainer}>
          <button className={styles.qtyButton} onClick={handleQtyDecrease}>
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