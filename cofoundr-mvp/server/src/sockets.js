import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import { config } from './config.js';
import Message from './models/Message.js';

export const initSockets = (httpServer) => {
  const io = new Server(httpServer, {
    cors: { origin: config.corsOrigin, credentials: true }
  });

  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      const { uid } = jwt.verify(token, config.jwtSecret);
      socket.userId = uid; next();
    } catch { next(new Error('unauthorized')); }
  });

  io.on('connection', (socket) => {
    socket.join(socket.userId);

    socket.on('message:send', async ({ to, content }) => {
      if (!to || !content) return;
      const msg = await Message.create({ from: socket.userId, to, content });
      io.to(to).emit('message:recv', msg);
      io.to(socket.userId).emit('message:recv', msg);
    });
  });

  return io;
};
