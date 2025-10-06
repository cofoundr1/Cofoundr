import { io } from 'socket.io-client';
export const makeSocket = (token) => io(import.meta.env.VITE_SOCKET_URL, { auth: { token } });
