import styles from "./Cart.module.css"
import CartCard from "../general/CartCard/cartCard.component";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { startGetMyCart, startDeleteMyCartLineItem, startDecQty, startIncQty } from "../../actions/cartAction"
import { useDispatch } from "react-redux";
export default function Cart (){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
      dispatch(startGetMyCart())
  }, [dispatch])

      const cartItems = useSelector((state=>{
        return state.cart.data
      }))
      console.log('cart',cartItems)
      
      const handleRemove = (item) => {
        const userConfirmation = window.confirm("Are you sure to remove the item ?")
        if(userConfirmation) {
            dispatch(startDeleteMyCartLineItem(item.productId))
            
        }
      };
      
      const handleQtyInc = (item) => {
        dispatch(startIncQty(item.productId))
      };
      const handleQtyDec = (item) => {
        dispatch(startDecQty(item.productId))
      };
      const handleCheckout = ()=>{
        navigate('/checkout')
      }
      
      return (
        <div className={styles.container}>
          <div className={styles.cartContainer}>
          {cartItems?.lineItems?.map((item,index) => (
            <>
            <CartCard
              key={item.id}
              item={item}
              onRemove={handleRemove}
              onQtyInc={handleQtyInc}
              onQtyDec={handleQtyDec}
            />
            {index < cartItems.lineItems.length - 1 && <hr style={{}} />}
            </>
          ))}
          </div>
          <div className={styles.amountContainer}>
            <div className={styles.title}>Total Amount</div>
            <div className={styles.price}>
            {`${!cartItems || cartItems?.lineItems?.length === 0 ? '$ '+0 : '$ '+cartItems?.totalAmount}`} 
            </div>
            <button className={styles.button} onClick={handleCheckout}>proceed to checkout</button>
          </div>
        </div>
      );
}