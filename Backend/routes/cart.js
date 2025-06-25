import express from 'express';
import { saveCart, getCart, clearCart, removeCartItem } from '../controllers/cartController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

// Save or update cart
router.post('/', authenticate, saveCart);
// Get cart
router.get('/', authenticate, getCart);
// Clear cart
router.delete('/', authenticate, clearCart);
// Remove a single item from the cart
router.post('/remove-item', authenticate, removeCartItem);

export default router;