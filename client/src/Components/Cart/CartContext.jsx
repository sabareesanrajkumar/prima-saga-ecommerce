import { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../Auth/AuthContext';

export const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const backendUrl = `https://crudcrud.com/api/192dbd67bc3b4f4c8bda5de08e8c92b7`;
  const { token } = useContext(AuthContext);
  const getEmailFromToken = (token) => {
    if (!token) return null;
    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload));
    return decoded.email.replace(/[@.]/g, '_');
  };
  const email = getEmailFromToken(token);
  console.log(email);
  const [cartElements, setCartElements] = useState([]);

  const saveCartBeforeLogout = async () => {
    if (token && email) {
      try {
        for (const item of cartElements) {
          if (item._id) {
            await axios.put(`${backendUrl}/cart_${email}/${item._id}`, item);
          } else {
            await axios.post(`${backendUrl}/cart_${email}`, item);
          }
        }
      } catch (err) {
        console.error('Error saving cart on logout', err);
      }
    }
  };

  const addToCart = async (product) => {
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

  const removeFromCart = async (product) => {
    setCartElements((prev) => prev.filter((item) => item.id !== product.id));
  };

  return (
    <CartContext.Provider
      value={{ cartElements, addToCart, removeFromCart, saveCartBeforeLogout }}
    >
      {children}
    </CartContext.Provider>
  );
};
