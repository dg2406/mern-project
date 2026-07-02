import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on refresh
  useEffect(() => {
    const existingCart = localStorage.getItem("cart");

    if (existingCart) {
      setCart(JSON.parse(existingCart));
    }
  }, []);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

// Custom Hook
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };