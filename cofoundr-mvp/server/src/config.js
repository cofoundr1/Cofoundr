import dotenv from 'dotenv';
dotenv.config();
export const config = {
  port: process.env.PORT || 4000,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  corsOrigin: (process.env.CORS_ORIGIN || '').split(',').filter(Boolean),
};
