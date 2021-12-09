import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

import express from 'express';
import cors from 'cors';

import { connectDB } from './db/connectDB';
import { cryptoRouter } from './routes/crypto';

// connect db
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigins = ['http://localhost:3000'];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
  credentials: true
};

// body parsing middleware
app.use(express.json());

app.use('/api/crypto', cryptoRouter);

app.use(cors(options));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}!`));
