import React, { useEffect, useState } from "react";
import "./Checkout.css";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
function Checkout() {
  const { getCartTotal } = useLocalStorage();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [cartTotal, setCartTotal] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setCartTotal(getCartTotal());
  }, []);

  function handleAddress(e) {
    setAddress(e.target.value);
  }
  function handleHouseNumber(e) {
    setHouseNumber(e.target.value);
  }
  function handleCity(e) {
    setCity(e.target.value);
  }
  function handleZipCode(e) {
    setZipCode(e.target.value);
  }

  function changeFullName(e) {
    setFullName(e.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault(); // Förhindrar formulärets standardbeteende
    const fullAddress = `${address} ${houseNumber}, ${zipCode}, ${city}`;
    const newOrder = {
      name: fullName,
      cost: getCartTotal() + 16,
      date: new Date().toLocaleString(),
      addressDetails: fullAddress,
    };
    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newOrder),
    };
    fetch("http://localhost:3002/orders", postOptions).then((res) => {
      if (res.ok) {
        localStorage.removeItem("cart");
        alert(
          "Thanks, your order has been submitted! It will be with you in 5-10 minutes."
        );
        // window.location.reload();
        navigate("/");
      }
    });
  }

  return (
    <>
      {getCartTotal() !== 0 ? (
        <div className="checkout">
          <div className="payment-methods">
            <a onClick={() => setPaymentMethod("card")}>
              <img src="/visa.png" alt="" />
            </a>
            <a onClick={() => setPaymentMethod("swish")}>
              <img src="/swish.png" alt="" />
            </a>
          </div>
          <form className="user-info" onSubmit={handleSubmit}>
            <div className="user-name-and-address">
              <input
                value={fullName}
                type="text"
                placeholder="Full name"
                required
                onChange={(e) => changeFullName(e)}
              />
              <input
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => handleAddress(e)}
              />
              <div className="zip-code-city">
                <input
                  type="tel"
                  placeholder="Zip code"
                  pattern="[0-9][0-9][0-9] [0-9][0-9]"
                  title="Format:000 00"
                  value={zipCode}
                  onChange={(e) => handleZipCode(e)}
                  required
                />
                <input
                  type="text"
                  placeholder="City"
                  required
                  value={city}
                  onChange={(e) => handleCity(e)}
                />
              </div>
              <input
                type="number"
                placeholder="House number"
                required
                value={houseNumber}
                onChange={(e) => handleHouseNumber(e)}
              />
              <textarea
                type="text"
                placeholder="Additional details for the driver"
              />
            </div>
            <div className="payment-info">
              {paymentMethod === "card" ? (
                <div className="payment-info-card">
                  <input
                    type="tel"
                    placeholder="Card number"
                    pattern="[0-9][0-9][0-9][0-9] [0-9][0-9][0-9][0-9] [0-9][0-9][0-9][0-9] [0-9][0-9][0-9][0-9]"
                    title="0000 0000 0000 0000"
                    required
                  />
                  <label>Expiration month/year</label>
                  <div className="cvc-expiration">
                    <input type="month" required />
                    <input
                      type="tel"
                      placeholder="CVC"
                      pattern="[0-9][0-9][0-9]"
                      title="three numbers, no spacing"
                      required
                    />
                  </div>
                </div>
              ) : (
                <div className="payment-info-swish">
                  <input
                    type="tel"
                    placeholder="Phone number"
                    pattern="[0][7][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]"
                    title="Ten numbers beginning with 07, no spacing"
                    required
                  />
                </div>
              )}
            </div>
            <div className="confirm">
              <button type="submit">Confirm</button>
            </div>
          </form>
          <div className="checkout-content-right">
            <div className="cart-details-checkout">
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
          </div>
        </div>
      ) : (
        alert("Your cart is empty")
      )}
    </>
  );
}

export default Checkout;
