import { createContext, useContext, useEffect, useState } from "react";

const OrderContext = createContext();

const OrderProvider = ({ children }) => {

  const [orders, setOrders] = useState([]);

  // load orders from localStorage
  useEffect(() => {

    let existingOrders =
      localStorage.getItem("orders");

    if (existingOrders) {
      setOrders(
        JSON.parse(existingOrders)
      );
    }

  }, []);

  return (
    <OrderContext.Provider
      value={[orders, setOrders]}
    >
      {children}
    </OrderContext.Provider>
  );
};

// custom hook
const useOrders = () =>
  useContext(OrderContext);

export {
  OrderProvider,
  useOrders
};