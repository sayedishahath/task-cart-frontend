import React from 'react';
import styles from './cartCard.module.css';

export default function CartCard({ item, onRemove, onQtyChange }) {
  const { image, name, price, qty } = item;

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
      <img src={image} alt={name} className={styles.image} />
      <div className={styles.info}>
        <h4 className={styles.name}>{name}</h4>
        <p className={styles.price}>${price}</p>
        <div className={styles.qtyContainer}>
          <button className={styles.qtyButton} onClick={handleQtyDecrease}>
            -
          </button>
          <span className={styles.qty}>{qty}</span>
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