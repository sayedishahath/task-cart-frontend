import styles from "./Cart.module.css"
import CartCard from "../general/CartCard/cartCard.component";
export default function Cart (){
    const cartItems = [
        {
          id: 1,
          image: 'https://example.com/image1.jpg',
          name: 'Item 1',
          price: 19.99,
          qty: 2,
        },
        {
          id: 2,
          image: 'https://example.com/image2.jpg',
          name: 'Item 2',
          price: 29.99,
          qty: 1,
        },
        // ...
      ];
      
      const handleRemove = (item) => {
        // Remove item from cart logic here
      };
      
      const handleQtyChange = (item, newQty) => {
        // Update item qty in cart logic here
      };
      
      return (
        <div>
          {cartItems.map((item) => (
            <CartCard
              key={item.id}
              item={item}
              onRemove={handleRemove}
              onQtyChange={handleQtyChange}
            />
          ))}
        </div>
      );
}