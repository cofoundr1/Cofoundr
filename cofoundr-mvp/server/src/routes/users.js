import express from 'express';
import User from '../models/User.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/me', auth, async (req, res) => {
  const me = await User.findById(req.userId);
  res.json(me);
});

router.put('/me', auth, async (req, res) => {
  const allowed = ['name','bio','skills','interests','location','partnerType','avatarUrl'];
  const update = {};
  for (const k of allowed) if (k in req.body) update[k] = req.body[k];
  const me = await User.findByIdAndUpdate(req.userId, update, { new: true });
  res.json(me);
});

router.get('/discover', auth, async (req, res) => {
  const { q = '' } = req.query;
  const me = await User.findById(req.userId);
  const terms = [...(me?.skills||[]), ...(me?.interests||[])]
    .filter(Boolean).map(t => new RegExp(t, 'i'));
  const or = terms.length ? [{ skills: { $in: terms } }, { interests: { $in: terms } }] : [{}];
  const users = await User.find({ _id: { $ne: me._id }, $or: or, name: new RegExp(q,'i') })
    .select('-passwordHash')
    .limit(30);
  res.json(users);
});

export default router;
