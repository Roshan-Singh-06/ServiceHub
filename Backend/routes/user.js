import express from 'express';
import { getUsers, getUserById, updateUser, deleteUser } from '../controllers/userController.js';
import { authenticate, authorizeAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get all users (admin only)
router.get('/all',  getUsers);

// Get a single user by ID (admin only)
router.get('/:id', getUserById);

// Update a user by ID (admin only)
router.patch('/:id',  updateUser);

// Delete a user by ID (admin only)
router.delete('/:id',deleteUser);

export default router;
