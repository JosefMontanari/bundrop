function useLocalStorage() {
  function setLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function isUserLoggedIn() {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user) {
      return true;
    } else {
      return false;
    }
  }

  function getCart() {
    const cart = JSON.parse(localStorage.getItem("cart"));
    return cart || [];
  }

  function getCartAmount() {
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (cart !== null) {
      let count = 0;
      cart.forEach((element) => {
        count = count + 1;
      });

      return count;
    }
    return 0;
  }

  function getCartTotal() {
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (cart !== null) {
      let count = 0;
      cart.forEach((element) => {
        count = count + element.price * element.quantity;
      });

      return count;
    }
    return 0;
  }

  function removeFromCart(id) {
    const currentCart = getCart();

    const newCart = currentCart
      .map((c) => {
        if (c.id === id) {
          c.quantity = c.quantity - 1;
          return c;
        } else {
          return c;
        }
      })
      .filter((c) => c.quantity > 0);

    setLocalStorage("cart", newCart);
  }

  function addToCart(item) {
    const currentCart = getCart();

    let itemExists = false;

    const newCart = currentCart.map((c) => {
      if (c.id === item.id) {
        c.quantity = c.quantity + 1;
        itemExists = true;
        return c;
      } else {
        return c;
      }
    });
    if (!itemExists) {
      newCart.push({ ...item, quantity: 1 });
    }
    setLocalStorage("cart", newCart);
  }

  return {
    getCartTotal,
    getCartAmount,
    setLocalStorage,
    getCart,
    addToCart,
    removeFromCart,
    isUserLoggedIn,
  };
}

export default useLocalStorage;
