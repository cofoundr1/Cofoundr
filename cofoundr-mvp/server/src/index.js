import express from 'express';
import http from 'http';
import cors from 'cors';
import { config } from './config.js';
import { connectDB } from './db.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import connectionRoutes from './routes/connections.js';
import messageRoutes from './routes/messages.js';
import { initSockets } from './sockets.js';

await connectDB(config.mongoUri);

const app = express();
app.use(cors({ origin: config.corsOrigin, credentials: true }));
app.use(express.json());

app.get('/', (_,res)=>res.json({ ok: true, name: 'CoFoundr API' }));
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/connections', connectionRoutes);
app.use('/messages', messageRoutes);

const server = http.createServer(app);
initSockets(server);
server.listen(config.port, () => console.log(`API on http://localhost:${config.port}`));
