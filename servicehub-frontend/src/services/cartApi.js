import api from './api';

// Save or update cart in backend
export const saveCart = async (items) => {
  return api.post('/cart', { items });
};

// Get cart from backend
export const getCart = async () => {
  return api.get('/cart');
};

// Clear cart in backend
export const clearCart = async () => {
  return api.delete('/cart');
};

// Remove a single item from cart in backend
export const removeCartItem = async (itemId) => {
  return api.post('/cart/remove-item', { itemId });
};
