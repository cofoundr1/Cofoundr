import express from 'express';
import Connection from '../models/Connection.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/request/:userId', auth, async (req, res) => {
  const { userId } = req.params;
  const pair = await Connection.findOneAndUpdate(
    { requester: req.userId, recipient: userId },
    {},
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );
  res.json(pair);
});

router.post('/respond/:connectionId', auth, async (req, res) => {
  const { connectionId } = req.params;
  const { action } = req.body; // 'accept' | 'decline'
  const status = action === 'accept' ? 'accepted' : 'declined';
  const updated = await Connection.findOneAndUpdate(
    { _id: connectionId, recipient: req.userId },
    { status }, { new: true }
  );
  res.json(updated);
});

router.get('/mine', auth, async (req, res) => {
  const list = await Connection.find({
    $or: [ { requester: req.userId }, { recipient: req.userId } ],
    status: 'accepted'
  }).populate('requester recipient', 'name avatarUrl skills partnerType');
  res.json(list);
});

export default router;
