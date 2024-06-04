import React, { useState } from "react";
import "./Checkout.css";
import useLocalStorage from "../../hooks/useLocalStorage";
function Checkout() {
  const { getCartTotal } = useLocalStorage();
  const [paymentMethod, setPaymentMethod] = useState("card");
  return (
    <div className="checkout">
      <div className="payment-methods">
        <a onClick={() => setPaymentMethod("card")}>
          <img src="/visa.png" alt="" />
        </a>
        <a onClick={() => setPaymentMethod("swish")}>
          <img src="/swish.png" alt="" />
        </a>
      </div>
      <div className="user-info">
        <div className="user-name-and-address">
          <input type="text" placeholder="Full name" />
          <input type="text" placeholder="Address" />
          <div className="zip-code-city">
            <input type="number" placeholder="Zip code" />
            <input type="text" placeholder="City" />
          </div>
          <input type="number" placeholder="House number" />
          <textarea
            type="text"
            placeholder="Additional details for the driver"
          />
        </div>
        <div className="payment-info">
          {paymentMethod === "card" ? (
            <div className="payment-info-card">
              <input type="number" placeholder="Card number" />
              <label>Expiration month/year</label>
              <div className="cvc-expiration">
                <input type="month" />
                <input type="number" placeholder="CVC" />
              </div>
            </div>
          ) : (
            <div className="payment-info-swish">
              <input
                type="tel"
                placeholder="Phone number"
                pattern="[0]{7}[0-9]-[0-9]{2}-[0-9]{2}-[0-9]{3}"
                required
              />
            </div>
          )}
        </div>
      </div>
      <div className="checkout-content-right">
        <div className="cart-details">
          {" "}
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
        <div className="confirm">
          <button>Confirm</button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
