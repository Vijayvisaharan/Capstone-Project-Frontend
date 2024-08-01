import React, { createContext, useState, useContext, useEffect } from 'react';
import artServices from '../services/artServices';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [cartItems, setCartItems] = useState([]); 
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    calculateTotalAmount(cartItems);
  }, [cartItems]); 

  
  const calculateTotalAmount = (items) => {
    const total = items &&items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    setTotalAmount(total);
  };
  
  
  const fetchCartItems = async () => {
    
    try {
      const data = await artServices.getCart();
      setLoading(true);
      setCartItems(data);
      calculateTotalAmount(cartItems);
    } catch (error) {
      console.error('Failed to fetch cart items:', error);
      setError('Failed to fetch cart items.');
    }
    finally {  
      setLoading(false);
    }
  };

  useEffect(() => {
   
    fetchCartItems();
  }, []); 

  const addToCart = async (artId) => {  
    try {   
      setLoading(true);
      await artServices.addTocart(artId); 
      fetchCartItems(); 
      setError(null);  
    } catch (error) {
      console.error('Error adding item to cart:', error);  
      setError('Error adding item to cart.');
    } finally {  
      setLoading(false);
    }
  };

  const updateQuantity = async (artId, quantity) => {  
    try {
       await artServices.updateQuantity(artId, quantity);
      fetchCartItems();    
    } catch (error) {
      console.error('Error updating item quantity:', error);
      setError('Error updating item quantity.');
    }
  };
  
  const removeFromCart = async (artId) => {
    try {
      await artServices.removeFromCart(artId);
      const updatedItems = cartItems.filter(item => item._id !== artId);
      setCartItems(updatedItems);
    } catch (error) {
      console.error('Failed to remove item from cart:', error);
    }
  };
 
  return (
    <CartContext.Provider value={{ cartItems, totalAmount, fetchCartItems, updateQuantity,addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);