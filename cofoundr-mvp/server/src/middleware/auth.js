import jwt from 'jsonwebtoken';
import { config } from '../config.js';

export const auth = (req, res, next) => {
  const hdr = req.headers.authorization || '';
  const token = hdr.startsWith('Bearer ') ? hdr.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Missing token' });
  try {
    const payload = jwt.verify(token, config.jwtSecret);
    req.userId = payload.uid;
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
