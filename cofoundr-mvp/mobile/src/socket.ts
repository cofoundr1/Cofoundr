import { io } from 'socket.io-client';
export const makeSocket = (token:string) => io(process.env.EXPO_PUBLIC_SOCKET || 'http://localhost:4000', { auth: { token } });
