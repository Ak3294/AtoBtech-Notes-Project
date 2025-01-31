import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Create or update user
router.post('/', async (req, res) => {
  try {
    const { email, uid } = req.body;
    
    let user = await User.findOne({ uid });
    
    if (user) {
      user.email = email;
      await user.save();
    } else {
      user = new User({ email, uid });
      await user.save();
    }
    
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;