import styles from "./Cart.module.css"
import CartCard from "../general/CartCard/cartCard.component";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { startGetMyCart, startDeleteMyCartLineItem, startDecQty, startIncQty } from "../../actions/cartAction"
import { useDispatch } from "react-redux";
export default function Cart (){
    // const cartItems = [
    //     {
    //       id: 1,
    //       image: 'https://example.com/image1.jpg',
    //       name: 'Item 1',
    //       price: 19.99,
    //       qty: 2,
    //     },
    //     {
    //       id: 2,
    //       image: 'https://example.com/image2.jpg',
    //       name: 'Item 2',
    //       price: 29.99,
    //       qty: 1,
    //     },
    //     // ...
    //   ];
    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(startGetMyCart())
  }, [dispatch])

      const cartItems = useSelector((state=>{
        return state.cart.data
      }))
      console.log('cart',cartItems)
      
      const handleRemove = (item) => {
        // Remove item from cart logic here
        const userConfirmation = window.confirm("Are you sure to remove the item ?")
        if(userConfirmation) {
            // console.log("hii")
            dispatch(startDeleteMyCartLineItem(item.productId))
            
        }
      };
      
      const handleQtyInc = (item) => {
        // Update item qty in cart logic here
        dispatch(startIncQty(item.productId))
      };
      const handleQtyDec = (item) => {
        // Update item qty in cart logic here
        dispatch(startDecQty(item.productId))
      };
      
      return (
        <div className={styles.container}>
          {cartItems?.lineItems?.map((item) => (
            <CartCard
              key={item.id}
              item={item}
              onRemove={handleRemove}
              onQtyInc={handleQtyInc}
              onQtyDec={handleQtyDec}
            />
          ))}
          <div>
          <h5>Total Amount</h5>
          {!cartItems || cartItems?.lineItems?.length === 0 ? 0 : cartItems?.totalAmount}
          </div>
        </div>
      );
}