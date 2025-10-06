import express from 'express';
import Message from '../models/Message.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/thread/:userId', auth, async (req, res) => {
  const { userId } = req.params;
  const msgs = await Message.find({
    $or: [ { from: req.userId, to: userId }, { from: userId, to: req.userId } ]
  }).sort({ createdAt: 1 });
  res.json(msgs);
});

export default router;
