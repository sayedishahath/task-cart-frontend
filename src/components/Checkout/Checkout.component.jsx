import styles from "./Checkout.module.css"
import CartCard from "../general/CartCard/cartCard.component";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { startGetMyCart, startDeleteMyCartLineItem, startDecQty, startIncQty } from "../../actions/cartAction"
import { useDispatch } from "react-redux";
export default function Checkout (){
    
  const dispatch = useDispatch()
  const cartItems = useSelector((state)=>{
    return state.cart.data
  })
  return (
    <div className={styles.paymentCard}>
      <div className={styles.paymentCard__header}>
        <h2>Payment Method</h2>
        <button>Edit</button>
      </div>
      <div className={styles.paymentCard__body}>
        <ul>
          <li>
            <span>Card Type:</span>
            <span>Visa</span>
          </li>
          <li>
            <span>Card Number:</span>
            <span>**** **** **** 1234</span>
          </li>
          <li>
            <span>Expiration Date:</span>
            <span>12/2025</span>
          </li>
          <li>
            <span>CVV:</span>
            <span>***</span>
          </li>
          <li>
            <span>Amount:</span>
            <span className={styles.price}>${cartItems.totalAmount}</span>
          </li>
        </ul>
      </div>
    </div>
  );

}