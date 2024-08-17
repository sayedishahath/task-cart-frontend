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
      console.log('cartitems ',cartItems)
      
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
          <div className={`${(cartItems.length===0 || cartItems?.lineItems?.length === 0) ? styles.cartContainerNB : styles.cartContainer}`}>
          {cartItems?.lineItems?.length>0?
          cartItems?.lineItems?.map((item,index) => (
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
          )):
          <p >No items in cart</p>}
          </div>
          <div className={styles.amountContainer}>
            <div className={styles.title}>Total Amount</div>
            <div className={styles.price}>
            {`${(cartItems.length===0 || cartItems?.lineItems?.length === 0) ? '$ '+0 : '$ '+cartItems?.totalAmount}`} 
            </div>
            <button className={styles.button} onClick={handleCheckout} disabled={cartItems?.lineItems?.length===0}>proceed to checkout</button>
          </div>
        </div>
      );
}