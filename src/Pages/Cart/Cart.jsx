import React, { useState, useEffect } from "react";
import "./Cart.css";
import useLocalStorage from "../../hooks/useLocalStorage";
function Cart() {
  const { getCartTotal, getCart, removeFromCart } = useLocalStorage();
  const [cartItems, setCartItems] = useState([]);

  function handleRemoveFromCart(id) {
    removeFromCart(id);
    setCartItems(getCart());
  }

  useEffect(() => {
    setCartItems(getCart());
    console.log(cartItems);
  }, []);
  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-top">
          <p></p>
          <p>Name</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {cartItems.map((item, index) => {
          return (
            <div>
              <div className="cart-items-item cart-items-top">
                <img src={item.image} alt="" />
                <p>{item.name}</p>
                <p>${item.price}</p>
                <p>{item.quantity}</p>
                <p>${item.price * item.quantity}</p>
                <p
                  onClick={() => handleRemoveFromCart(item.id)}
                  className="cross"
                >
                  x
                </p>
              </div>
              <hr />
            </div>
          );
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-details">
          <h2>Total:</h2>
          <div className="cart-totals">
            <p>Subtotal</p>
            <p>${getCartTotal()}</p>
          </div>
          <hr />
          <div className="cart-totals">
            <p>Delivery Fee</p>
            <p>${getCartTotal() === 0 ? 0 : 18}</p>
          </div>
          <hr />
          <div className="cart-totals">
            <b>Total</b>
            <b>${getCartTotal() === 0 ? 0 : getCartTotal() + 18}</b>
          </div>
        </div>

        <div className="checkout-container">
          <button>Proceed to checkout</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
