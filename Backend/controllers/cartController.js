import Cart from '../models/Cart.js';

// Save or update cart for a user
export const saveCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { items } = req.body;
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart items required.' });
    }
    let cart = await Cart.findOne({ user: userId });
    if (cart) {
      cart.items = items;
      cart.updatedAt = Date.now();
      await cart.save();
    } else {
      cart = await Cart.create({ user: userId, items });
    }
    res.json({ success: true, cart });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get cart for a user
export const getCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ user: userId });
    res.json({ success: true, cart });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Clear cart for a user
export const clearCart = async (req, res) => {
  try {
    const userId = req.user._id;
    await Cart.findOneAndDelete({ user: userId });
    res.json({ success: true, message: 'Cart cleared.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Remove a single item from the cart for a user
export const removeCartItem = async (req, res) => {
  try {
    const userId = req.user._id;
    const { itemId } = req.body;
    if (!itemId) {
      return res.status(400).json({ success: false, message: 'itemId is required.' });
    }
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found.' });
    }
    // Debug log
    console.log('Removing itemId:', itemId, 'from cart items:', cart.items.map(i => i.itemId));
    cart.items = cart.items.filter(item => String(item.itemId) !== String(itemId));
    await cart.save();
    res.json({ success: true, cart });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
