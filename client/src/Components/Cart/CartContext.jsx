import { createContext, useState } from 'react';

export const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const [cartElements, setCartElements] = useState([]);
  const addToCart = (product) => {
    setCartElements((prev) => {
      const existingCart = prev.find((item) => item.id === product.id);
      if (existingCart) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (product) => {
    setCartElements((prev) => prev.filter((item) => item.id !== product.id));
  };

  return (
    <CartContext.Provider value={{ cartElements, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
