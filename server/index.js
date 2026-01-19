import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';

import connectDB from './config/connectDB.js';

import userRouter from './routes/user.route.js';
import categoryRouter from './routes/category.route.js';
import OrderRouter from './routes/order.route.js';
import addressRouter from './routes/address.route.js';
import uploadRouter from './routes/upload.route.js';
import subCategoryRouter from './routes/subCategory.route.js';
import productRouter from './routes/product.route.js';
import cartRouter from './routes/cart.route.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  credentials: true,
  origin: process.env.FRONTEND_URL || "http://localhost:5173"
}));

app.use(cookieParser());
app.use(morgan());
app.use(helmet({ crossOriginResourcePolicy: false }));

app.get('/', (req, res) => {
  res.json({ message: "Hello from server" });
});

app.use('/api/user', userRouter);
app.use('/api/category', categoryRouter);
app.use('/api/file', uploadRouter);
app.use('/api/subcategory', subCategoryRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter);
app.use('/api/order', OrderRouter);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// ✅ DB connection (safe in serverless)
await connectDB();

export default app;
